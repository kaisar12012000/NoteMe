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

describe("NoteMe_Integration_Testing", function () {
    const name1 = "Integration test user 1"
    const email1 = "int_testUser1@email.com"
    const password1 = "IntTestUser1"
    const notes1 = "Writing notes to undergo integration testing";
    const newNotes1 = "This is the updated notes for user 1";
    var token1;
    var note1Obj;
    var token2;
    var note2Obj;
    var email2 = "testDummyUser1@email.com";
    var password2 = "dummyPassword1";
    it("Should User1 Signup", function(done) {
        // sign up
        request.post({
            url: SIGNUP_ENDPOINT,
            json: {name: name1, email: email1, password: password1}
        }, function(error, response, body) {
            var _body = {}
            try {
                _body = JSON.parse(body)
            } catch (error) {
                _body = {}
            }
            should(response.statusCode).equal(201);
            token1 = body?.data?.accessToken;
            done()
        })

    })
    it("Should User1 Post Notes", function(done) {
         // post note
         request.post({
            url: GET_POST_NOTES_ENDPOINT,
            json: {notesContent: notes1},
            headers: {
                Authorization: `Bearer ${token1}`
            }
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
    it("Should GetUser1 All notes", function(done) {
        request.get({
            url: GET_POST_NOTES_ENDPOINT,
            // json: {notesContent: notes1},
            headers: {
                Authorization: `Bearer ${token1}`
            }
        }, function(error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(200)
            should(_body?.data?.notes[0]?.notesContent).equal(notes1)

            note1Obj = _body?.data?.notes[0];
            done()
        })
    })
    it("Should User1 Update Note", function(done) {
        let endpoint = GET_UPDATE_DELETE_NOTES_BY_ID_ENDPOINT.replace(":id", note1Obj?.notesId)
        request.put({
            url: endpoint,
            json: {
                notesContent: newNotes1
            },
            headers: {
                Authorization: `Bearer ${token1}`
            }
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
    it("Should User1 Get Notes", function(done) {
        let endpoint = GET_UPDATE_DELETE_NOTES_BY_ID_ENDPOINT.replace(":id", note1Obj?.notesId)
        request.get({
            url: endpoint,
            headers: {
                Authorization: `Bearer ${token1}`
            }
        }, function(error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(200)
            should(_body?.data?.notes?.notesContent).equal(newNotes1)

            note1Obj = _body?.data?.notes;
            done()
        })
    })
    it("Should User2 Login", function(done) {
        request.post({
            url: LOGIN_ENDPOINT,
            json: {
                email: email2,
                password: password2
            }
        }, function(error, response, body) {
            var _body = {}
            try {
                _body = JSON.parse(body)
            } catch (error) {
                _body = {}
            }

            should(response.statusCode).equal(200)
            token2 = body?.data?.accessToken;
            done()
        })
    })
    it("Should User2 Share Notes", function (done) {
        request.get({
            url: GET_POST_NOTES_ENDPOINT,
            // json: {notesContent: notes1},
            headers: {
                Authorization: `Bearer ${token2}`
            }
        }, function(error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(200)

            note2Obj = _body?.data?.notes[0];

            const endpoint = SHARE_NOTES_ENDPOINT.replace(":id", note2Obj?.notesId)
            request.post({
                url: endpoint,
                json: {
                    userBEmail: email1
                },
                headers: {
                    Authorization: `Bearer ${token2}`
                }
            }, function(error, response, body) {
                var _body = {}
                try {
                    _body = JSON.parse(body)
                } catch (error) {
                    _body = {}
                }

                should(response.statusCode).equal(200)
                // console.log(body)
                body?.data?.link.should.have.property("linkcode")

                done()
            })
        })
    })
    it("Should User1 Search Notes", function(done) {
        const endpoint = SEARCH_NOTES_ENDPOINT.replace(":query", "Updated")
        request.post({
            url: endpoint,
            headers: {
                Authorization: `Bearer ${token1}`
            }
        }, function(error, response, body) {
            let _body = {}
            try{
                _body = JSON.parse(body)
            } catch(error) {
                _body = {}
            }
            should(response.statusCode).equal(200);
            should(_body?.data?.notes[0]?.notesContent).equal(newNotes1)
            done()
        })
    })
    it("Should User1 Delete Note", function(done) {
        let endpoint = GET_UPDATE_DELETE_NOTES_BY_ID_ENDPOINT.replace(":id", note1Obj?.notesId)
        request.delete({
            url: endpoint,
            headers: {
                Authorization: `Bearer ${token1}`
            }
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
})