/**
 * Automation testing
 * @author Irshaduddin Chowdhury
 * 
 */
require("dotenv").config()
var should = require("should");
var request = require("request");
var urlBase = process.env.APP_URL;

const SIGNUP_ENDPOINT = urlBase+"api/auth/signup"
const LOGIN_ENDPOINT = urlBase+"api/auth/login"
const GET_POST_NOTES_ENDPOINT = urlBase+"api/notes"
const GET_UPDATE_DELETE_NOTES_BY_ID_ENDPOINT = urlBase+"api/notes/:id"
const SHARE_NOTES_ENDPOINT = urlBase+"api/notes/:id/share"
const SEARCH_NOTES_ENDPOINT = urlBase+"api/search?q=:query"

describe("NoteMe_Unit_Testing", function() {
    it("Should_Signup", function(done) {
        let userData = {
            name: "Unit test user 1",
            email: "unit_testUser1@email.com",
            password: "UnitTestUser1"
        }
        request.post({
            url: SIGNUP_ENDPOINT,
            json: userData
        }, function(error, response, body) {
            var _body = {}
            try {
                _body = JSON.parse(body)
            } catch (error) {
                _body = {}
            }
            should(response.statusCode).equal(201)
            done();
        })
    })
    it("Should_Login", function(done) {
        const userData = {
            email: "testDummyUser1@email.com",
            password: "dummyPassword1"
        }
        request.post({
            url: LOGIN_ENDPOINT,
            json: userData
        }, function (error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(200)
            done()
        })
    })
    it("Should_PostNotes", function(done) {
        const postData = {
            notesContent: "This is a dummy notes that I want to add for unit testing 1."
        }
        request.post({
            url: GET_POST_NOTES_ENDPOINT+"?isTesting=true",
            json: postData,
        }, function(error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(201)
            done()
        })
    })
    it("Should_UpdateNotes", function(done) {
        const endpoint = GET_UPDATE_DELETE_NOTES_BY_ID_ENDPOINT.replace(":id", "764376a9-f7ad-4aac-ab99-4aff32eb7a4c")
        const postData = {
            notesContent: "This is new notes content!"
        }
        request.put({
            url: endpoint+"?isTesting=true",
            json: postData,
        }, function(error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(204)
            done()
        })
    })
    it("Should_GetNotes", function(done) {
        request.get({
            url: GET_POST_NOTES_ENDPOINT+"?isTesting=true"
        }, function(error, response, body) {
            var _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(200)
            done()
        })
    })
    it("Should_GetNotesById", function(done) {
        const endpoint = GET_UPDATE_DELETE_NOTES_BY_ID_ENDPOINT.replace(":id", "764376a9-f7ad-4aac-ab99-4aff32eb7a4c")
        request.get({
            url: endpoint+"?isTesting=true"
        }, function(error, response, body) {
            var _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(200)
            done()
        })
    })
    it("Should_ShareNotes", function(done) {
        const endpoint = SHARE_NOTES_ENDPOINT.replace(":id", "764376a9-f7ad-4aac-ab99-4aff32eb7a4c")
        const postData = {
            userBEmail: "testDummyUser2@email.com" 
           }
        request.post({
            url: endpoint+"?isTesting=true",
            json: postData
        }, function(error, response, body) {
            var _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(200)
            done()
        })
    })
    it("Should_SearchNotes", function(done) {
        let endpoint = SEARCH_NOTES_ENDPOINT+"&isTesting=true"
        endpoint = endpoint.replace(":query", "new")
        request.post({
            url: endpoint
        }, function(error, response, body) {
            var _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(200)
            done()
        })
    })
    it("Should_DeleteNotes", function(done) {
        const endpoint = GET_UPDATE_DELETE_NOTES_BY_ID_ENDPOINT.replace(":id", "764376a9-f7ad-4aac-ab99-4aff32eb7a4c")
        request.delete({
            url: endpoint+"?isTesting=true"
        }, function(error, response, body) {
            var _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(204)
            done()
        })
    })
})
