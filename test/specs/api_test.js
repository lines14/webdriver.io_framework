const chai = require('chai');
const assert = chai.assert, expectChai = chai.expect;
chai.use(require("chai-sorted"));
const configManager = require('../../main/config_manager');
const jsonplaceholderApi = require('../jsonplaceholder_api');

describe('REST API (GET/POST) task', function(){    
    it('Test JSONPlaceholder API', async function() {
        let response = await jsonplaceholderApi.getPosts();
        assert.equal(response.status, configManager.getTestData().code_200, 'status code is not 200');
        assert.isTrue(await jsonplaceholderApi.isJson(response.data), 'the list in response body is not json');
        expectChai(response.data).to.be.ascendingBy('id', 'posts are not sorted ascending (by id)');

        response = await jsonplaceholderApi.getPosts(configManager.getTestData().apiId_99);
        assert.equal(response.status, configManager.getTestData().code_200, 'status code is not 200');
        assert.equal(response.data.userId, configManager.getTestData().apiUserId_10, 'userid is not 10');
        assert.equal(response.data.id, configManager.getTestData().apiId_99, 'id is not 99');
        assert.notPropertyVal(response.data, configManager.getTestData().apiTitle, configManager.getTestData().emptyProperty, 'title is not empty');
        assert.notPropertyVal(response.data, configManager.getTestData().apiBody, configManager.getTestData().emptyProperty, 'body is not empty');

        response = await jsonplaceholderApi.getPosts(configManager.getTestData().apiId_150);
        assert.equal(response.status, configManager.getTestData().code_404, 'status code is not 404');
        assert.isEmpty(response.data, 'response body is not empty');

        const randomPostModel = await jsonplaceholderApi.createRandomModel(configManager.getTestData().apiPosts);
        response = await jsonplaceholderApi.postPosts(randomPostModel);
        assert.equal(response.status, configManager.getTestData().code_201, 'status code is not 201');
        assert.include(response.data, randomPostModel, 'title, body, userid not match data from request');
        assert.notPropertyVal(response.data, configManager.getTestData().apiId, configManager.getTestData().emptyProperty, 'id is not present in response');

        response = await jsonplaceholderApi.getUsers();
        assert.equal(response.status, configManager.getTestData().code_200, 'status code is not 200');
        assert.isTrue(await jsonplaceholderApi.isJson(response.data), 'the list in response body is not json');
        const responseDataToCompare = response.data[configManager.getTestData().comparedUserIndex];
        assert.deepEqual(responseDataToCompare, configManager.getTestData().comparedUser, 'user (id=5) data not equals to model');

        response = await jsonplaceholderApi.getUsers(configManager.getTestData().apiId_5);
        assert.equal(response.status, configManager.getTestData().code_200, 'status code is not 200');
        assert.deepEqual(response.data, responseDataToCompare, 'user data not matches with user data in the previous step');
    });
});