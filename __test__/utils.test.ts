import { describe, expect, test } from "@jest/globals"
import { googleSearch, normalize } from "../src/lib/utils"
import "./envConfig"

describe("testing utility functions", ()=>{
    test("normalize test", ()=>{
        expect(normalize("tired is the brain")).toBe("tired brain")
        expect(normalize("he's ready")).toBe("he ready")
        expect(normalize("there is multiple spaces      here")).toBe("multiple spaces here")
    })
})

/*
 * Uncomment this block to test google search functionality
 * This block is commented out to avoid unnecessary API calls during tests because we're in free tier
 * and it may lead to rate limiting or unexpected charges.
describe("testing google search", ()=>{
    test("test get google search result", async()=>{
        const result = await googleSearch("child run play")
        expect(result).toBeInstanceOf(Array)
        expect(result[0]).toHaveProperty("link")
    })
})
*/