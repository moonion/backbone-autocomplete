(function(A,B){if(typeof define==="function"&&define.amd){define(["underscore","backbone","jquery"],B)}else{if(typeof exports!=="undefined"){module.exports=B(require("underscore"),require("backbone"),require("backbone").$)}else{B(A._,A.Backbone,(A.jQuery||A.Zepto||A.$))}}}(this,function(A,D,C){var B=D.View.extend({tagName:"li",template:A.template('<a href="#"><%= label %></a>'),events:{click:"select"},initialize:function(E){this.options=E},render:function(){this.$el.html(this.template({label:this.highlight(this.model.label())}));return this},highlight:function(E){var F=this.options.parent;if(E&&F.highlight&&F.currentText){E=E.replace(new RegExp(this.escapeRegExp(F.currentText),"gi"),function(G){return C("<b>").addClass(F.highlight).html(G)})}return E},escapeRegExp:function(E){return String(E).replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")},select:function(){this.options.parent.hide().select(this.model);return false}});D.AutoCompleteView=D.View.extend({tagName:"ul",className:"autocomplete",wait:300,queryParameter:"query",minKeywordLength:2,currentText:"",itemView:B,highlight:"",initialize:function(E){A.extend(this,E);this.filter=A.debounce(this.filter,this.wait)},render:function(){this.input.attr("autocomplete","off");this.$el.width(this.input.outerWidth());this.input.keyup(A.bind(this.keyup,this)).keydown(A.bind(this.keydown,this)).after(this.$el);return this},keydown:function(E){if(E.keyCode==38){return this.move(-1)}if(E.keyCode==40){return this.move(+1)}if(E.keyCode==13){return this.onEnter()}if(E.keyCode==27){return this.hide()}},keyup:function(){var E=this.input.val();if(this.isChanged(E)){if(this.isValid(E)){this.filter(E)}else{this.hide()}this.currentText=E}},filter:function(E){var E=E.toLowerCase();if(this.model.url){var F={};F[this.queryParameter]=E;this.model.fetch({success:A.bind(function(){this.loadResult(this.model.models,E)},this),data:F,cache:(typeof this.model.cache!="undefined")?this.model.cache:undefined,dataType:(this.model.datatype)?this.model.datatype:undefined,jsonpCallback:(this.model.callback)?this.model.callback:undefined})}else{this.loadResult(this.model.filter(function(G){return G.label().toLowerCase().indexOf(E)!==-1}),E)}},isValid:function(E){return E.length>this.minKeywordLength},isChanged:function(E){return this.currentText!=E},move:function(E){var G=this.$el.children(".active"),H=this.$el.children(),F=G.index()+E;if(H.eq(F).length){G.removeClass("active");H.eq(F).addClass("active")}return false},onEnter:function(){this.$el.children(".active").click();return false},loadResult:function(F,E){this.show().reset();if(F.length){A.forEach(F,this.addItem,this);this.show()}else{this.hide()}},addItem:function(E){this.$el.append(new this.itemView({model:E,parent:this}).render().$el)},select:function(F){var E=F.label();this.input.val(E);this.currentText=E;this.onSelect(F)},reset:function(){this.$el.empty();return this},hide:function(){this.$el.hide();return this},show:function(){this.$el.show();return this},onSelect:function(){}})}));