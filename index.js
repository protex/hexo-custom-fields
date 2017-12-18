/**
 *  "hexo-custom-fields"
 *  Made by Jakob Löhnertz (www.jakob.codes)
 *
 *  Syntax: <%- custom_field('posts|pages, 'title_in_the_front_matter', 'name_of_the_field') %>
 */

var _ = require('lodash.find');  // lodash's '_find()' is needed below

/*
 *  The parameters:
 *  'type': the directory the function searches in (so either 'posts' or 'pages'),
 *  'title': has to match a 'title' given in the front-matter of a Markdown source file
 *  'field': the name of the actual field in the source file
 */
function findCustomField(type, key, value, field) {
    var data = hexo["database"]["_models"];  // path to the data of all 'posts' and 'pages'
    if (type === 'posts') {
        data = data["Post"];  // select either the object of all posts
    } else if (type === 'pages') {
        data = data["Page"];  // or the object of all pages
    } else {
        return "Error: Couldn't find " + field + "@" + type + "/" + title + "; you must specify either 'posts' or 'pages' as the first argument";
        // if neither 'posts' nor 'pages' was given as the first argument the plugin return this error message
    }
    data = data["data"];  // the acutal data is in the 'data' object

    console.log(JSON.stringify(data));

    var target = _.find(data, [key, value]);  // using 'lodash' to find the first occurence of the given 'title' in the data object

    return target[field];  // lastly extract the chosen 'field' from the target post or page source and return it
}
hexo.extend.helper.register('custom_field', findCustomField);  // this registers this plugin with Hexo
