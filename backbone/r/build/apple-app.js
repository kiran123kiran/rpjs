define("apple-item.tpl",[],function(){return'             <a href="#apples/<%=name%>" target="_blank">            <%=name%>            </a>&nbsp;<a class="add-to-cart" href="#">buy</a>            '}),define("apple-home.tpl",[],function(){return'Apple data:         <ul class="apples-list">        </ul>        <div class="cart-box"></div>'}),define("apple-spinner.tpl",[],function(){return'<img src="img/spinner.gif" width="30"/>'}),define("apple.tpl",[],function(){return'<figure>                              <img src="<%= attributes.url%>"/>                              <figcaption><%= attributes.name %></figcaption>                            </figure>'}),define("apple-item.view",["apple-item.tpl"],function(e){return Backbone.View.extend({tagName:"li",template:_.template(e),events:{"click .add-to-cart":"addToCart"},render:function(){this.$el.html(this.template(this.model.attributes))},addToCart:function(){this.model.collection.trigger("addToCart",this.model)}})}),define("apple-home.view",["apple-home.tpl","apple-item.view"],function(e,t){return Backbone.View.extend({el:"body",listEl:".apples-list",cartEl:".cart-box",template:_.template(e),initialize:function(){this.$el.html(this.template),this.collection.on("addToCart",this.showCart,this)},showCart:function(e){$(this.cartEl).append(e.attributes.name+"<br/>")},render:function(){view=this,this.collection.each(function(e){var i=new t({model:e});i.render(),$(view.listEl).append(i.$el)})}})}),define("apple.view",["apple.tpl","apple-spinner.tpl"],function(e,t){return Backbone.View.extend({initialize:function(){this.model=new(Backbone.Model.extend({})),this.model.on("change",this.render,this),this.on("spinner",this.showSpinner,this)},template:_.template(e),templateSpinner:t,loadApple:function(e){this.trigger("spinner");var t=this;setTimeout(function(){t.model.set(t.collection.where({name:e})[0].attributes)},1e3)},render:function(){var e=this.template(this.model);$("body").html(e)},showSpinner:function(){$("body").html(this.templateSpinner)}})}),define("apples",[],function(){return Backbone.Collection.extend({})}),requirejs.config({urlArgs:"bust="+(new Date).getTime()}),require(["apple-item.tpl","apple-home.tpl","apple-spinner.tpl","apple.tpl","apple-item.view","apple-home.view","apple.view","apples"],function(e,t,i,n,a,l,p,o){var r,s=[{name:"fuji",url:"img/fuji.jpg"},{name:"gala",url:"img/gala.jpg"}],c=Backbone.Router.extend({routes:{"":"home","apples/:appleName":"loadApple"},initialize:function(){var e=new o;e.reset(s),this.homeView=new l({collection:e}),this.appleView=new p({collection:e})},home:function(){this.homeView.render()},loadApple:function(e){this.appleView.loadApple(e)}});$(document).ready(function(){r=new c,Backbone.history.start()})}),define("apple-app",function(){});