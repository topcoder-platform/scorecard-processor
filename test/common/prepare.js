/*
 * Setting up Mock for all tests
 */

const nock = require('nock')
const prepare = require('mocha-prepare')
const testData = require('../common/testData')

prepare(function (done) {
  nock(/\.com/)
    .persist()
    .post('/oauth/token')
    .reply(200, { access_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJUb3Bjb2RlciBVc2VyIiwiQ29ubmVjdCBTdXBwb3J0IiwiYWRtaW5pc3RyYXRvciIsInRlc3RSb2xlIiwiYWFhIiwidG9ueV90ZXN0XzEiLCJDb25uZWN0IE1hbmFnZXIiLCJDb25uZWN0IEFkbWluIiwiY29waWxvdCIsIkNvbm5lY3QgQ29waWxvdCBNYW5hZ2VyIl0sImlzcyI6Imh0dHBzOi8vYXBpLnRvcGNvZGVyLWRldi5jb20iLCJoYW5kbGUiOiJUb255SiIsImV4cCI6MTU2NTY4MTkyMCwidXNlcklkIjoiODU0Nzg5OSIsImlhdCI6MTU1NTY4MTMyMCwiZW1haWwiOiJhamVmdHNAdG9wY29kZXIuY29tIiwianRpIjoiMTlhMDkzNzAtMjk4OC00N2I4LTkxODktMGRhODVjNjM0ZWQyIn0.V8nsQpbzQ_4iEd0dAbuYsfeydnhSAEQ95AKKwl8RONw' })
    .get('/v4/challenges/30049360')
    .reply(200, testData.challenges['30049360'])
    .get('/v4/challenges/30054674')
    .reply(200, testData.challenges['30054674'])
    .get('/v4/challenges/89898989')
    .reply(404, testData.challenges['89898989'])
    .get('/v5/submissions?legacySubmissionId=206743&')
    .reply(200, [{ id: 'b91a0ca3-3988-4899-bab4-c789f22def39' }])
    .get('/v5/submissions?legacySubmissionId=111111111&')
    .reply(200, [])
    .get('/v5/reviewTypes?isActive=true&name=Review&perPage=100&')
    .reply(200, [testData.reviewTypes[0]], { 'X-Total-Pages': 2 })
    .get('/v5/reviewTypes?isActive=true&name=Review&page=2&perPage=100&')
    .reply(200, [testData.reviewTypes[1]], { 'X-Total-Pages': 2 })
    .get('/v5/reviewTypes?isActive=true&name=Post-Mortem&perPage=100&')
    .reply(200, [], { 'X-Total-Pages': 1 })
    .get('/v5/reviews?reviewerId=151743&scoreCardId=300001610&submissionId=b91a0ca3-3988-4899-bab4-c789f22def39&')
    .reply(200, testData.reviews, { 'X-Total-Pages': 1 })
    .get('/v5/reviews?reviewerId=151743&scoreCardId=300001611&submissionId=b91a0ca3-3988-4899-bab4-c789f22def39&')
    .reply(200, [], { 'X-Total-Pages': 1 })
    .put('/v5/reviews/9c1c080a-b54f-46c4-b87b-6218038be765')
    .reply(200)
    .post('/v5/reviews')
    .reply(200)
    .get(/\/scorecards\/.+/)
    .reply(200, { 'id': 'b9956051-4749-4912-abd5-bf4d701af891', 'scorecardDetails': [{ 'id': 'b9956051-4749-4912-abd1-af4d701af891', 'name': 'AV Scan', 'phase': 'submission', 'isActive': true, 'topic': 'avscan.action.scan', 'weight': 25 }, { 'id': 'b9956051-4749-4912-abd1-af4d701af892', 'name': 'OR', 'phase': 'review', 'isActive': true, 'topic': 'or.action.review', 'weight': 25 }, { 'id': 'b9956051-4749-4912-abd1-af4d701af893', 'name': 'AV Scan', 'phase': 'registration', 'isActive': true, 'topic': 'avscan.action.scan', 'weight': 25 }, { 'id': 'b9956051-4749-4912-abd1-af4d701af894', 'name': 'OR', 'phase': 'registration', 'isActive': true, 'topic': 'or.action.review', 'weight': 25 }] })

  done()
}, function (done) {
// called after all test completes (regardless of errors)
  nock.cleanAll()
  done()
})
