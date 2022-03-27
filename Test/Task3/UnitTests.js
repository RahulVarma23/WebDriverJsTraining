const credentials = require("./credentials")

describe("Password validation",()=>{

    it("Test valid password",()=>{
        let msg = credentials.passwordValidation("testing1")
        console.log("returned msg:-> "+msg)
    })

    it("Test password having less than 8 characters",()=>{
        let msg = credentials.passwordValidation("pass123")
        console.log("returned msg:-> "+msg)
    })

    it('Test password having more than 12 characters',()=>{
        let msg = credentials.passwordValidation("password@1234")
        console.log("returned msg:-> "+msg)
    })

})