import {getStage} from "../../../../../../@littleware/little-elements/web/lib/test/util.js";
import {LittleJwt, parseSignedJwt} from "../jwt.js";

describe( "The lw-jwt custom element", function() {
    const testToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImZlbmNlX2tleV8yMDE4LTEwLTEyVDE5OjM5OjIzWiJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsicG9saWNpZXMiOltdLCJnb29nbGUiOnsibGlua2VkX2dvb2dsZV9hY2NvdW50IjoiZ2lhbmdidWkwODE2QGdtYWlsLmNvbSIsInByb3h5X2dyb3VwIjoiMDQwZXcwdncxZ2xiazJ2In0sImlzX2FkbWluIjpmYWxzZSwibmFtZSI6InRlc3RAZXhhbXBsZS5jb20iLCJwcm9qZWN0cyI6e319fSwianRpIjoiMWViZTg2MDAtMmU3My00YmVmLThkYzMtNTJiYjIzZmZiYTZmIiwiYXVkIjpbIm9wZW5pZCIsInVzZXIiLCJjcmVkZW50aWFscyIsImRhdGEiLCJhZG1pbiIsImdvb2dsZV9jcmVkZW50aWFscyIsImdvb2dsZV9zZXJ2aWNlX2FjY291bnQiXSwiZXhwIjoxNTQ0MzAwMTM0LCJhenAiOiIiLCJpc3MiOiJodHRwczovL2plbmtpbnMtYnJhaW4ucGxhbngtcGxhLm5ldC91c2VyIiwiaWF0IjoxNTQ0Mjk4OTM0LCJwdXIiOiJhY2Nlc3MiLCJzdWIiOiIzOCJ9.M2KI98UHluBNO7fRm1jZu6i8NXfniZjwpUzIK8C97hDVk-01Lwg7z8kKc1CnDpglj9E4nvdV1QKmDMkO4Sivvi4fXjqfcWP7NTbtU1BN6u9-7iQrNnsvKFMO80w8rcfRaM0EkQ_UPxPojCva3HDFGCVMLmr8njFO6Rj3qWRBSmVqd5rpPIIcpJeO1b_idoGQuHQdKyGAb8ohyySLHXapLnMmvWUKsRbseZ1IdDSBfCcWsCk7DVBuAw4edXT1IPVqMHFZV9ivBcpnconxLacjCNPJE7R9t1zsSsEKQwqHEHZ-g-fjCrVu5epU0gutHwADoWk_Wr3SIHBarcjWKaKydw";
    let lwJwt: LittleJwt = null;
    let stage = null;

    beforeAll(function() {
        stage = getStage("JwtSpec", "Testing Jwt Container");
        lwJwt = new LittleJwt();
        stage.appendChild(lwJwt);
    });

    it("Can parse a signed jwt", function() {
        const data = parseSignedJwt(testToken);
        expect(data.isValid).toBe(true);
        expect(data.errorStr).toBe("");
    });

    it("Renders and assigned token", function(done) {
        lwJwt.token = testToken;
        // render is async - should use a mutation observer, but do this for now
        setTimeout(() => {
            const bodyNode = lwJwt.querySelector("div.lw-jwt-body");
            expect(!!(bodyNode && bodyNode.textContent)).toBe(true);
            expect(bodyNode.textContent.length).toBeGreaterThan(0);
            done();
        }, 20);
    });

});
