/**
 * Internal dependencies
 */
import {
	__experimentalRegisterCheckoutFilters,
	__experimentalApplyCheckoutFilter,
} from '../';

describe( 'Checkout registry', () => {
	const filterName = 'loremIpsum';

	test( 'should return default value if there are no filters', () => {
		const value = 'Hello World';
		const newValue = __experimentalApplyCheckoutFilter( {
			filterName,
			defaultValue: value,
		} );

		expect( newValue ).toBe( value );
	} );

	test( 'should return filtered value when a filter is registered', () => {
		const value = 'Hello World';
		__experimentalRegisterCheckoutFilters( filterName, {
			[ filterName ]: ( val, args ) =>
				val.toUpperCase() + args.punctuationSign,
		} );
		const newValue = __experimentalApplyCheckoutFilter( {
			filterName,
			defaultValue: value,
			arg: {
				punctuationSign: '!',
			},
		} );

		expect( newValue ).toBe( 'HELLO WORLD!' );
	} );

	test( 'should not return filtered value if validation failed', () => {
		const value = 'Hello World';
		__experimentalRegisterCheckoutFilters( filterName, {
			[ filterName ]: ( val ) => val.toUpperCase(),
		} );
		const newValue = __experimentalApplyCheckoutFilter( {
			filterName,
			defaultValue: value,
			validation: ( val ) => ! val.includes( 'HELLO' ),
		} );

		expect( newValue ).toBe( value );
	} );

	test( 'should catch filter errors if user is not an admin', () => {
		const spy = {};
		spy.console = jest
			.spyOn( console, 'error' )
			.mockImplementation( () => {} );

		const error = new Error( 'test error' );
		const value = 'Hello World';
		__experimentalRegisterCheckoutFilters( filterName, {
			[ filterName ]: () => {
				throw error;
			},
		} );
		const newValue = __experimentalApplyCheckoutFilter( {
			filterName,
			defaultValue: value,
		} );

		expect( spy.console ).toHaveBeenCalledWith( error );
		expect( newValue ).toBe( value );
		spy.console.mockRestore();
	} );
} );
