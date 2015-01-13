"use strict";

module.exports = VersionClient;

/**
 * Used to access Jira REST endpoints in '/rest/api/2/version'
 * @param {JiraClient} jiraClient
 * @constructor VersionClient
 */
function VersionClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Creates a version
     *
     * @method createVersion
     * @memberOf VersionClient#
     * @param {Object} opts The request options sent to Jira.
     * @param {Object} opts.version See {@link https://docs.atlassian.com/jira/REST/latest/#d2e3549}
     * @param callback Called when the version has been created.
     */
    this.createVersion = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/version'),
            method: 'POST',
            json: true,
            followAllRedirects: true,
            body: opts.version
        };

        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @memberOf FilterClient#
     * @param {Object} opts The arguments passed to the method.
     * @param {number} opts.versionId The ID of the screen to use in the path.
     * @param {Array} [opts.fields] The fields to include
     * @param {Array} [opts.expand] The fields to expand
     * @param {string} path The path of the endpoint following /version/{id}
     * @param {string} method The request method.
     * @param {Object} [body] The request body, if any.
     * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
     * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
     */
    this.buildRequestOptions = function (opts, path, method, body, qs) {
        var basePath = '/version/' + opts.versionId;
        if (!qs) qs = {};
        if (!body) body = {};

        if (opts.fields) {
            qs.fields = '';
            opts.fields.forEach(function (field) {
                qs.fields += field + ','
            });
            qs.fields = qs.fields.slice(0, -1);
        }

        if (opts.expand) {
            qs.expand = '';
            opts.expand.forEach(function (ex) {
                qs.expand += ex + ','
            });
            qs.expand = qs.expand.slice(0, -1);
        }

        return {
            uri: this.jiraClient.buildURL(basePath + path),
            method: method,
            body: body,
            qs: qs,
            followAllRedirects: true,
            json: true
        };
    };
}