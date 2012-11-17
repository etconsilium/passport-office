/**
 * @idea by http://howtonode.org/express-mongodb/articleprovider-mongodb.js
 * @license BSDLv2
 */


/**
 * @require object.extend
 */
var $extend=require('object.extend');

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

/**
 * main function
 * @param  {host:host, port:port, dbname:dbname, options:{auto_reconnect:true|false, native_parser: true}} parameters connection
 * @return void
 */
var Storage = function(parameters, callback){
  if ('function' !== typeof callback) callback=function(){};
  parameters = parameters.extend({
    host:'127.0.0.1'
    , port: 27017
    , dbname: 'test'
    , options: {
      auto_reconnect: true
      , native_parser: false
    }
  })
  this.db = new Db(
    parameters.dbname
    , new Server(
      parameters.host
      , parameters.port
      , parameters.options, {}
    )
  );
  this.db.open(callback);
  return this;
};

//getCollection

Storage.prototype.getCollection= function(collection, callback) {
  if ('function' == typeof collection){
    callback=collection;
    collection='*';
  }
  if ('function' !== typeof callback) callback=function(error, collection){if (!!error) return colection;};

  this.db.collection(collection, function(error, article_collection) {
    if ( !!error ) callback(error);
    else callback(null, article_collection);
  });

  return this;
};

//findAll
// Storage.prototype.findAll = function(callback) {
//     this.getCollection(function(error, article_collection) {
//       if ( !!error ) callback(error)
//       else {
//         article_collection.find().toArray(function(error, results) {
//           if( !!error ) callback(error)
//           else callback(null, results)
//         });
//       }
//     });
//     return this;
// };

//findById
ArticleProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

//save
ArticleProvider.prototype.save = function(articles, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        if( typeof(articles.length)=="undefined")
          articles = [articles];

        for( var i =0;i< articles.length;i++ ) {
          article = articles[i];
          article.created_at = new Date();
          if( article.comments === undefined ) article.comments = [];
          for(var j =0;j< article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
        }

        article_collection.insert(articles, function() {
          callback(null, articles);
        });
      }
    });
};



module.exports = exports.Storage = Storage;
