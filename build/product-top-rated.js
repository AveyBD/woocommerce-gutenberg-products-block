this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-top-rated"]=function(e){function t(t){for(var r,a,i=t[0],s=t[1],u=t[2],d=0,b=[];d<i.length;d++)a=i[d],n[a]&&b.push(n[a][0]),n[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(l&&l(t);b.length;)b.shift()();return c.push.apply(c,u||[]),o()}function o(){for(var e,t=0;t<c.length;t++){for(var o=c[t],r=!0,i=1;i<o.length;i++){var s=o[i];0!==n[s]&&(r=!1)}r&&(c.splice(t--,1),e=a(a.s=o[0]))}return e}var r={},n={13:0},c=[];function a(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=e,a.c=r,a.d=function(e,t,o){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(a.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(o,r,function(t){return e[t]}.bind(null,r));return o},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var i=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=s;return c.push([521,0,2,1]),o()}({0:function(e,t){!function(){e.exports=this.wp.element}()},1:function(e,t){!function(){e.exports=this.wp.i18n}()},10:function(e,t){!function(){e.exports=this.wp.apiFetch}()},11:function(e,t){!function(){e.exports=this.React}()},18:function(e,t){!function(){e.exports=this.wp.blocks}()},19:function(e,t){!function(){e.exports=this.wp.url}()},22:function(e,t){!function(){e.exports=this.wp.compose}()},28:function(e,t){!function(){e.exports=this.wp.keycodes}()},3:function(e,t){!function(){e.exports=this.wp.components}()},30:function(e,t,o){"use strict";o.d(t,"b",function(){return r});var r=["woocommerce/product-best-sellers","woocommerce/product-category","woocommerce/product-new","woocommerce/product-on-sale","woocommerce/product-top-rated"];t.a={columns:{type:"number",default:wc_product_block_data.default_columns},rows:{type:"number",default:wc_product_block_data.default_rows},alignButtons:{type:"boolean",default:!1},categories:{type:"array",default:[]},catOperator:{type:"string",default:"any"},contentVisibility:{type:"object",default:{title:!0,price:!0,rating:!0,button:!0}}}},31:function(e,t,o){"use strict";var r=o(8),n=o.n(r),c=o(0),a=o(1),i=o(4),s=o.n(i),u=o(3),l=function(e){var t=e.onChange,o=e.settings,r=o.button,i=o.price,s=o.rating,l=o.title;return Object(c.createElement)(c.Fragment,null,Object(c.createElement)(u.ToggleControl,{label:Object(a.__)("Product title","woo-gutenberg-products-block"),help:l?Object(a.__)("Product title is visible.","woo-gutenberg-products-block"):Object(a.__)("Product title is hidden.","woo-gutenberg-products-block"),checked:l,onChange:function(){return t(n()({},o,{title:!l}))}}),Object(c.createElement)(u.ToggleControl,{label:Object(a.__)("Product price","woo-gutenberg-products-block"),help:i?Object(a.__)("Product price is visible.","woo-gutenberg-products-block"):Object(a.__)("Product price is hidden.","woo-gutenberg-products-block"),checked:i,onChange:function(){return t(n()({},o,{price:!i}))}}),Object(c.createElement)(u.ToggleControl,{label:Object(a.__)("Product rating","woo-gutenberg-products-block"),help:s?Object(a.__)("Product rating is visible.","woo-gutenberg-products-block"):Object(a.__)("Product rating is hidden.","woo-gutenberg-products-block"),checked:s,onChange:function(){return t(n()({},o,{rating:!s}))}}),Object(c.createElement)(u.ToggleControl,{label:Object(a.__)("Add to Cart button","woo-gutenberg-products-block"),help:r?Object(a.__)("Add to Cart button is visible.","woo-gutenberg-products-block"):Object(a.__)("Add to Cart button is hidden.","woo-gutenberg-products-block"),checked:r,onChange:function(){return t(n()({},o,{button:!r}))}}))};l.propTypes={settings:s.a.shape({button:s.a.bool.isRequired,price:s.a.bool.isRequired,rating:s.a.bool.isRequired,title:s.a.bool.isRequired}).isRequired,onChange:s.a.func.isRequired},t.a=l},34:function(e,t,o){"use strict";var r=o(0),n=o(1),c=o(5),a=o(4),i=o.n(a),s=o(3),u=function(e){var t=e.columns,o=e.rows,a=e.setAttributes,i=e.alignButtons;return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(s.RangeControl,{label:Object(n.__)("Columns","woo-gutenberg-products-block"),value:t,onChange:function(e){var t=Object(c.clamp)(e,wc_product_block_data.min_columns,wc_product_block_data.max_columns);a({columns:Object(c.isNaN)(t)?"":t})},min:wc_product_block_data.min_columns,max:wc_product_block_data.max_columns}),Object(r.createElement)(s.RangeControl,{label:Object(n.__)("Rows","woo-gutenberg-products-block"),value:o,onChange:function(e){var t=Object(c.clamp)(e,wc_product_block_data.min_rows,wc_product_block_data.max_rows);a({rows:Object(c.isNaN)(t)?"":t})},min:wc_product_block_data.min_rows,max:wc_product_block_data.max_rows}),Object(r.createElement)(s.ToggleControl,{label:Object(n.__)("Align Add to Cart buttons","woo-gutenberg-products-block"),help:i?Object(n.__)("Buttons are aligned vertically.","woo-gutenberg-products-block"):Object(n.__)("Buttons follow content.","woo-gutenberg-products-block"),checked:i,onChange:function(){return a({alignButtons:!i})}}))};u.propTypes={columns:i.a.oneOfType([i.a.number,i.a.string]).isRequired,rows:i.a.oneOfType([i.a.number,i.a.string]).isRequired,alignButtons:i.a.bool.isRequired,setAttributes:i.a.func.isRequired},t.a=u},35:function(e,t,o){"use strict";var r=o(0),n=o(6),c=o.n(n),a=o(48),i=o.n(a);o.d(t,"a",function(){return s});var s=function(e){return function(t){var o=t.attributes,n=o.align,a=o.contentVisibility,s=c()(n?"align".concat(n):"",{"is-hidden-title":!a.title,"is-hidden-price":!a.price,"is-hidden-rating":!a.rating,"is-hidden-button":!a.button});return Object(r.createElement)(r.RawHTML,{className:s},function(e,t){var o=e.attributes,r=o.attributes,n=o.attrOperator,c=o.categories,a=o.catOperator,s=o.orderby,u=o.products,l=o.columns||wc_product_block_data.default_columns,d=o.rows||wc_product_block_data.default_rows,b=new Map;switch(b.set("limit",d*l),b.set("columns",l),c&&c.length&&(b.set("category",c.join(",")),a&&"all"===a&&b.set("cat_operator","AND")),r&&r.length&&(b.set("terms",r.map(function(e){return e.id}).join(",")),b.set("attribute",r[0].attr_slug),n&&"all"===n&&b.set("terms_operator","AND")),s&&("price_desc"===s?(b.set("orderby","price"),b.set("order","DESC")):"price_asc"===s?(b.set("orderby","price"),b.set("order","ASC")):"date"===s?(b.set("orderby","date"),b.set("order","DESC")):b.set("orderby",s)),t){case"woocommerce/product-best-sellers":b.set("best_selling","1");break;case"woocommerce/product-top-rated":b.set("orderby","rating");break;case"woocommerce/product-on-sale":b.set("on_sale","1");break;case"woocommerce/product-new":b.set("orderby","date"),b.set("order","DESC");break;case"woocommerce/handpicked-products":if(!u.length)return"";b.set("ids",u.join(",")),b.set("limit",u.length);break;case"woocommerce/product-category":if(!c||!c.length)return"";break;case"woocommerce/products-by-attribute":if(!r||!r.length)return""}var p="[products",g=!0,f=!1,m=void 0;try{for(var _,h=b[Symbol.iterator]();!(g=(_=h.next()).done);g=!0){var w=i()(_.value,2);p+=" "+w[0]+'="'+w[1]+'"'}}catch(e){f=!0,m=e}finally{try{g||null==h.return||h.return()}finally{if(f)throw m}}return p+="]"}(t,e))}}},36:function(e,t){!function(){e.exports=this.ReactDOM}()},37:function(e,t,o){"use strict";var r=o(29),n=o.n(r),c=o(13),a=o.n(c),i=o(14),s=o.n(i),u=o(15),l=o.n(u),d=o(16),b=o.n(d),p=o(12),g=o.n(p),f=o(17),m=o.n(f),_=o(0),h=o(1),w=o(19),O=o(10),j=o.n(O),k=o(5),y=o(4),v=o.n(y),C=o(24),x=o(3),E=(o(79),function(e){function t(){var e;return a()(this,t),(e=l()(this,b()(t).apply(this,arguments))).state={list:[],loading:!0},e.renderItem=e.renderItem.bind(g()(e)),e}return m()(t,e),s()(t,[{key:"componentDidMount",value:function(){var e=this;j()({path:Object(w.addQueryArgs)("/wc/blocks/products/categories",{per_page:-1})}).then(function(t){e.setState({list:t,loading:!1})}).catch(function(){e.setState({list:[],loading:!1})})}},{key:"renderItem",value:function(e){var t=e.item,o=e.search,r=e.depth,c=void 0===r?0:r,a=["woocommerce-product-categories__item"];o.length&&a.push("is-searching"),0===c&&0!==t.parent&&a.push("is-skip-level");var i=t.breadcrumbs.length?"".concat(t.breadcrumbs.join(", "),", ").concat(t.name):t.name;return Object(_.createElement)(C.b,n()({className:a.join(" ")},e,{showCount:!0,"aria-label":Object(h.sprintf)(Object(h._n)("%s, has %d product","%s, has %d products",t.count,"woo-gutenberg-products-block"),i,t.count)}))}},{key:"render",value:function(){var e=this.state,t=e.list,o=e.loading,r=this.props,n=r.onChange,c=r.onOperatorChange,a=r.operator,i=r.selected,s=r.isSingle,u={clear:Object(h.__)("Clear all product categories","woo-gutenberg-products-block"),list:Object(h.__)("Product Categories","woo-gutenberg-products-block"),noItems:Object(h.__)("Your store doesn't have any product categories.","woo-gutenberg-products-block"),search:Object(h.__)("Search for product categories","woo-gutenberg-products-block"),selected:function(e){return Object(h.sprintf)(Object(h._n)("%d category selected","%d categories selected",e,"woo-gutenberg-products-block"),e)},updated:Object(h.__)("Category search results updated.","woo-gutenberg-products-block")};return Object(_.createElement)(_.Fragment,null,Object(_.createElement)(C.a,{className:"woocommerce-product-categories",list:t,isLoading:o,selected:i.map(function(e){return Object(k.find)(t,{id:e})}).filter(Boolean),onChange:n,renderItem:this.renderItem,messages:u,isHierarchical:!0,isSingle:s}),!!c&&Object(_.createElement)("div",{className:i.length<2?"screen-reader-text":""},Object(_.createElement)(x.SelectControl,{className:"woocommerce-product-categories__operator",label:Object(h.__)("Display products matching","woo-gutenberg-products-block"),help:Object(h.__)("Pick at least two categories to use this setting.","woo-gutenberg-products-block"),value:a,onChange:c,options:[{label:Object(h.__)("Any selected categories","woo-gutenberg-products-block"),value:"any"},{label:Object(h.__)("All selected categories","woo-gutenberg-products-block"),value:"all"}]})))}}]),t}(_.Component));E.propTypes={onChange:v.a.func.isRequired,onOperatorChange:v.a.func,operator:v.a.oneOf(["all","any"]),selected:v.a.array.isRequired,isSingle:v.a.bool},E.defaultProps={operator:"any",isSingle:!1},t.a=E},39:function(e,t){!function(){e.exports=this.wp.viewport}()},46:function(e,t){!function(){e.exports=this.wp.hooks}()},5:function(e,t){!function(){e.exports=this.lodash}()},51:function(e,t){!function(){e.exports=this.wp.htmlEntities}()},52:function(e,t){!function(){e.exports=this.wp.date}()},521:function(e,t,o){"use strict";o.r(t);var r=o(8),n=o.n(r),c=o(0),a=o(1),i=o(18),s=o(25),u=o.n(s),l=o(5),d=o(13),b=o.n(d),p=o(14),g=o.n(p),f=o(15),m=o.n(f),_=o(16),h=o.n(_),w=o(17),O=o.n(w),j=o(3),k=o(9),y=o(4),v=o.n(y),C=o(31),x=o(34),E=o(37),P=function(e){function t(){return b()(this,t),m()(this,h()(t).apply(this,arguments))}return O()(t,e),g()(t,[{key:"getInspectorControls",value:function(){var e=this.props,t=e.attributes,o=e.setAttributes,r=t.categories,n=t.catOperator,i=t.columns,s=t.contentVisibility,u=t.rows,l=t.alignButtons;return Object(c.createElement)(k.InspectorControls,{key:"inspector"},Object(c.createElement)(j.PanelBody,{title:Object(a.__)("Layout","woo-gutenberg-products-block"),initialOpen:!0},Object(c.createElement)(x.a,{columns:i,rows:u,alignButtons:l,setAttributes:o})),Object(c.createElement)(j.PanelBody,{title:Object(a.__)("Content","woo-gutenberg-products-block"),initialOpen:!0},Object(c.createElement)(C.a,{settings:s,onChange:function(e){return o({contentVisibility:e})}})),Object(c.createElement)(j.PanelBody,{title:Object(a.__)("Filter by Product Category","woo-gutenberg-products-block"),initialOpen:!1},Object(c.createElement)(E.a,{selected:r,onChange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=e.map(function(e){return e.id});o({categories:t})},operator:n,onOperatorChange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";return o({catOperator:e})}})))}},{key:"render",value:function(){var e=this.props,t=e.name,o=e.attributes;return Object(c.createElement)(c.Fragment,null,this.getInspectorControls(),Object(c.createElement)(j.Disabled,null,Object(c.createElement)(k.ServerSideRender,{block:t,attributes:o})))}}]),t}(c.Component);P.propTypes={attributes:v.a.object.isRequired,name:v.a.string.isRequired,setAttributes:v.a.func.isRequired};var R=P,S=o(35),A=o(30),B="woocommerce/product-top-rated";Object(i.registerBlockType)(B,{title:Object(a.__)("Top Rated Products","woo-gutenberg-products-block"),icon:{src:Object(c.createElement)(u.a,{icon:"trophy"}),foreground:"#96588a"},category:"woocommerce",keywords:[Object(a.__)("WooCommerce","woo-gutenberg-products-block")],description:Object(a.__)("Display a grid of your top rated products.","woo-gutenberg-products-block"),supports:{align:["wide","full"]},attributes:n()({},A.a),transforms:{from:[{type:"block",blocks:Object(l.without)(A.b,B),transform:function(e){return Object(i.createBlock)("woocommerce/product-top-rated",e)}}]},deprecated:[{attributes:A.a,save:Object(S.a)(B)}],edit:function(e){return Object(c.createElement)(R,e)},save:function(){return null}})},54:function(e,t){!function(){e.exports=this.wp.dom}()},55:function(e,t){},56:function(e,t){},57:function(e,t){},58:function(e,t){},7:function(e,t){!function(){e.exports=this.moment}()},9:function(e,t){!function(){e.exports=this.wp.editor}()}});