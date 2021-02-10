<?php
namespace Automattic\WooCommerce\Blocks\BlockTypes;

/**
 * Checkout class.
 *
 * @internal
 */
class Checkout extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'checkout';

	/**
	 * Registers the block type with WordPress. This is ran during init.
	 *
	 * @see Automattic\WooCommerce\Blocks\Library::register_blocks
	 */
	public function register_block_type() {
		// Register the block script.
		$this->asset_api->register_script(
			'wc-' . $this->block_name . '-block',
			$this->asset_api->get_block_asset_build_path( $this->block_name ),
			array_merge(
				[ 'wc-vendors', 'wc-blocks', 'wc-blocks-checkout', 'wc-price-format' ],
				$this->integration_registry->get_all_registered_script_handles()
			)
		);

		// Register the block type with WordPress.
		register_block_type(
			$this->namespace . '/' . $this->block_name,
			array(
				'render_callback' => array( $this, 'render' ),
				'editor_script'   => 'wc-' . $this->block_name . '-block',
				'editor_style'    => 'wc-block-editor',
				'style'           => 'wc-block-style',
				'script'          => 'wc-' . $this->block_name . '-block-frontend',
				'supports'        => [],
			)
		);
	}

	/**
	 * Append frontend scripts when rendering the block.
	 *
	 * @param array|\WP_Block $attributes Block attributes, or an instance of a WP_Block. Defaults to an empty array.
	 * @param string          $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public function render( $attributes = array(), $content = '' ) {
		if ( $this->is_checkout_endpoint() ) {
			// Note: Currently the block only takes care of the main checkout form -- if an endpoint is set, refer to the
			// legacy shortcode instead and do not render block.
			return '[woocommerce_checkout]';
		}
		$block_attributes = is_a( $attributes, '\WP_Block' ) ? $attributes->attributes : $attributes;

		do_action( 'woocommerce_blocks_enqueue_checkout_block_scripts_before' );
		$this->enqueue_assets( $block_attributes );
		do_action( 'woocommerce_blocks_enqueue_checkout_block_scripts_after' );

		// Deregister core checkout scripts and styles.
		wp_deregister_script( 'wc-checkout' );
		wp_deregister_script( 'wc-password-strength-meter' );
		wp_deregister_script( 'selectWoo' );
		wp_deregister_style( 'select2' );

		return $this->inject_html_data_attributes( $content . $this->get_skeleton(), $block_attributes );
	}

	/**
	 * Check if we're viewing a checkout page endpoint, rather than the main checkout page itself.
	 *
	 * @return boolean
	 */
	protected function is_checkout_endpoint() {
		return is_wc_endpoint_url( 'order-pay' ) || is_wc_endpoint_url( 'order-received' );
	}

	/**
	 * Extra data passed through from server to client for block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_data( array $attributes = [] ) {
		parent::enqueue_data( $attributes );

		if ( ! $this->asset_data_registry->exists( 'allowedCountries' ) ) {
			$this->asset_data_registry->add( 'allowedCountries', $this->deep_sort_with_accents( WC()->countries->get_allowed_countries() ) );
		}

		if ( ! $this->asset_data_registry->exists( 'allowedStates' ) ) {
			$this->asset_data_registry->add( 'allowedStates', $this->deep_sort_with_accents( WC()->countries->get_allowed_country_states() ) );
		}

		if ( ! $this->asset_data_registry->exists( 'shippingCountries' ) ) {
			$this->asset_data_registry->add( 'shippingCountries', $this->deep_sort_with_accents( WC()->countries->get_shipping_countries() ) );
		}

		if ( ! $this->asset_data_registry->exists( 'shippingStates' ) ) {
			$this->asset_data_registry->add( 'shippingStates', $this->deep_sort_with_accents( WC()->countries->get_shipping_country_states() ) );
		}

		$permalink = ! empty( $attributes['cartPageId'] ) ? get_permalink( $attributes['cartPageId'] ) : false;

		if ( $permalink && ! $this->asset_data_registry->exists( 'page-' . $attributes['cartPageId'] ) ) {
			$this->asset_data_registry->add( 'page-' . $attributes['cartPageId'], $permalink );
		}

		// Hydrate the following data depending on admin or frontend context.
		if ( is_admin() && function_exists( 'get_current_screen' ) ) {
			$screen = get_current_screen();

			if ( $screen && $screen->is_block_editor() && ! $this->asset_data_registry->exists( 'shippingMethodsExist' ) ) {
				$methods_exist = wc_get_shipping_method_count( false, true ) > 0;
				$this->asset_data_registry->add( 'shippingMethodsExist', $methods_exist );
			}
		}

		if ( ! is_admin() && ! WC()->is_rest_api_request() ) {
			$this->hydrate_from_api();
			$this->hydrate_customer_payment_methods();
		}

		do_action( 'woocommerce_blocks_checkout_enqueue_data' );
	}

	/**
	 * Removes accents from an array of values, sorts by the values, then returns the original array values sorted.
	 *
	 * @param array $array Array of values to sort.
	 * @return array Sorted array.
	 */
	protected function deep_sort_with_accents( $array ) {
		if ( ! is_array( $array ) || empty( $array ) ) {
			return $array;
		}

		if ( is_array( reset( $array ) ) ) {
			return array_map( [ $this, 'deep_sort_with_accents' ], $array );
		}

		$array_without_accents = array_map( 'remove_accents', array_map( 'wc_strtolower', array_map( 'html_entity_decode', $array ) ) );
		asort( $array_without_accents );
		return array_replace( $array_without_accents, $array );
	}

	/**
	 * Register/enqueue scripts used for this block.
	 *
	 * @param array $attributes  Any attributes that currently are available from the block.
	 *                           Note, this will be empty in the editor context when the block is
	 *                           not in the post content on editor load.
	 */
	protected function enqueue_scripts( array $attributes = [] ) {
		$this->asset_api->register_block_script( $this->block_name . '-frontend', $this->block_name . '-block-frontend', [] );
	}

	/**
	 * Get customer payment methods for use in checkout.
	 */
	protected function hydrate_customer_payment_methods() {
		if ( ! is_user_logged_in() || $this->asset_data_registry->exists( 'customerPaymentMethods' ) ) {
			return;
		}
		add_filter( 'woocommerce_payment_methods_list_item', [ $this, 'include_token_id_with_payment_methods' ], 10, 2 );
		$this->asset_data_registry->add(
			'customerPaymentMethods',
			wc_get_customer_saved_methods_list( get_current_user_id() )
		);
		remove_filter( 'woocommerce_payment_methods_list_item', [ $this, 'include_token_id_with_payment_methods' ], 10, 2 );
	}

	/**
	 * Hydrate the checkout block with data from the API.
	 */
	protected function hydrate_from_api() {
		// Print existing notices now, otherwise they are caught by the Cart
		// Controller and converted to exceptions.
		wc_print_notices();

		if ( ! $this->asset_data_registry->exists( 'cartData' ) ) {
			$this->asset_data_registry->add( 'cartData', WC()->api->get_endpoint_data( '/wc/store/cart' ) );
		}
		if ( ! $this->asset_data_registry->exists( 'checkoutData' ) ) {
			add_filter( 'woocommerce_store_api_disable_nonce_check', '__return_true' );
			$this->asset_data_registry->add( 'checkoutData', WC()->api->get_endpoint_data( '/wc/store/checkout' ) );
			remove_filter( 'woocommerce_store_api_disable_nonce_check', '__return_true' );
		}
	}

	/**
	 * Render skeleton markup for the checkout block.
	 */
	protected function get_skeleton() {
		return '
			<div class="wc-block-skeleton wc-block-components-sidebar-layout wc-block-checkout wc-block-checkout--is-loading wc-block-checkout--skeleton hidden" aria-hidden="true">
				<div class="wc-block-components-main wc-block-checkout__main">
					<div class="wc-block-components-express-payment wc-block-components-express-payment--checkout"></div>
					<div class="wc-block-components-express-payment-continue-rule wc-block-components-express-payment-continue-rule--checkout"><span></span></div>
					<form class="wc-block-checkout__form">
						<fieldset class="wc-block-checkout__contact-fields wc-block-components-checkout-step">
							<div class="wc-block-components-checkout-step__heading">
								<div class="wc-block-components-checkout-step__title"></div>
							</div>
							<div class="wc-block-components-checkout-step__container">
								<div class="wc-block-components-checkout-step__content">
									<span></span>
								</div>
							</div>
						</fieldset>
						<fieldset class="wc-block-checkout__contact-fields wc-block-components-checkout-step">
							<div class="wc-block-components-checkout-step__heading">
								<div class="wc-block-components-checkout-step__title"></div>
							</div>
							<div class="wc-block-components-checkout-step__container">
								<div class="wc-block-components-checkout-step__content">
									<span></span>
								</div>
							</div>
						</fieldset>
						<fieldset class="wc-block-checkout__contact-fields wc-block-components-checkout-step">
							<div class="wc-block-components-checkout-step__heading">
								<div class="wc-block-components-checkout-step__title"></div>
							</div>
							<div class="wc-block-components-checkout-step__container">
								<div class="wc-block-components-checkout-step__content">
									<span></span>
								</div>
							</div>
						</fieldset>
						<fieldset class="wc-block-checkout__contact-fields wc-block-components-checkout-step">
							<div class="wc-block-components-checkout-step__heading">
								<div class="wc-block-components-checkout-step__title"></div>
							</div>
							<div class="wc-block-components-checkout-step__container">
								<div class="wc-block-components-checkout-step__content">
									<span></span>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
				<div class="wc-block-components-sidebar wc-block-checkout__sidebar">
					<div class="components-card"></div>
				</div>
				<div class="wc-block-components-main wc-block-checkout__main-totals">
					<div class="wc-block-checkout__actions">
						<button class="components-button button wc-block-button wc-block-components-checkout-place-order-button">&nbsp;</button>
					</div>
				</div>
			</div>
		' . $this->get_skeleton_inline_script();
	}

	/**
	 * Callback for woocommerce_payment_methods_list_item filter to add token id
	 * to the generated list.
	 *
	 * @param array     $list_item The current list item for the saved payment method.
	 * @param \WC_Token $token     The token for the current list item.
	 *
	 * @return array The list item with the token id added.
	 */
	public static function include_token_id_with_payment_methods( $list_item, $token ) {
		$list_item['tokenId'] = $token->get_id();
		$brand                = ! empty( $list_item['method']['brand'] ) ?
			strtolower( $list_item['method']['brand'] ) :
			'';
		// phpcs:ignore WordPress.WP.I18n.TextDomainMismatch -- need to match on translated value from core.
		if ( ! empty( $brand ) && esc_html__( 'Credit card', 'woocommerce' ) !== $brand ) {
			$list_item['method']['brand'] = wc_get_credit_card_type_label( $brand );
		}
		return $list_item;
	}
}
