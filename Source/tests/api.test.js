const http = require("http")

function request(method, path, body = null) {

  return new Promise((resolve) => {

    const options = {

      hostname: "localhost",

      port: 3000,

      path,

      method,

      headers: {

        "Content-Type": "application/json"

      }

    }

    const req = http.request(options, (res) => {

      let data = ""

      res.on("data", (chunk) => {

        data += chunk

      })

      res.on("end", () => {

        let parsedBody = data

        try {

          parsedBody = JSON.parse(data)

        } catch (error) {

        }

        resolve({

          statusCode: res.statusCode,

          body: parsedBody

        })

      })

    })

    req.on("error", (err) => {

      resolve({

        statusCode: 0,

        body: { error: err.message }

      })

    })

    if (body) {

      req.write(JSON.stringify(body))

    }

    req.end()

  })

}

async function runTest(name, method, path, expectedStatus, body = null, validator = null) {

  const result = await request(method, path, body)

  if (result.statusCode !== expectedStatus) {

    console.log(`FAIL: ${name} expected ${expectedStatus} but got ${result.statusCode}`)

    console.log(result.body)

    return false

  }

  if (validator && !validator(result.body)) {

    console.log(`FAIL: ${name} response validation failed`)

    console.log(result.body)

    return false

  }

  console.log(`PASS: ${name}`)

  return true

}

async function runAllTests() {

  console.log("Running API tests...")

  let passed = 0

  let total = 0

  async function test(name, method, path, expectedStatus, body = null, validator = null) {

    total += 1

    const ok = await runTest(name, method, path, expectedStatus, body, validator)

    if (ok) passed += 1

  }

  await test(

    "Health endpoint",

    "GET",

    "/health",

    200,

    null,

    (body) => body.status === "ok" && body.service === "device-api"

  )

  await test(

    "Ready endpoint",

    "GET",

    "/ready",

    200,

    null,

    (body) => body.status === "ready"

  )

  await test(

    "Devices endpoint",

    "GET",

    "/devices",

    200,

    null,

    (body) => Array.isArray(body) && body.length > 0

  )

  await test(

    "Available devices endpoint",

    "GET",

    "/devices/available",

    200,

    null,

    (body) => Array.isArray(body)

  )

  await test(

    "Single device endpoint",

    "GET",

    "/devices/1",

    200,

    null,

    (body) => body.id === 1

  )

  await test(

    "Invalid device endpoint",

    "GET",

    "/devices/999",

    404,

    null,

    (body) => body.message === "Device not found"

  )

  await test(

    "Protected admin endpoint",

    "GET",

    "/admin",

    403,

    null,

    (body) => body.error === "Forbidden"

  )

  await test(

    "Student login",

    "POST",

    "/login",

    200,

    { username: "student_demo", role: "student" },

    (body) => body.message === "Login successful" && body.role === "student"

  )

  await test(

    "Staff login",

    "POST",

    "/login",

    200,

    { username: "staff_admin", role: "staff" },

    (body) => body.message === "Login successful" && body.role === "staff"

  )

  await test(

    "Notification subscription",

    "POST",

    "/subscribe",

    200,

    { email: "student@example.com", model: "Dell Laptop" },

    (body) => body.message === "Subscription created"

  )

  await test(

    "Reserve device",

    "POST",

    "/reserve/1",

    200,

    null,

    (body) => body.message === "Device reserved" && body.reservation && body.reservation.deviceId === 1

  )

  await test(

    "Collect device as staff",

    "POST",

    "/collect/1",

    200,

    { role: "staff" },

    (body) => body.message === "Device collected" && body.reservation.status === "collected"

  )

  await test(

    "Return device as staff",

    "POST",

    "/return/1",

    200,

    { role: "staff" },

    (body) => body.message === "Device returned" && body.reservation.status === "returned"

  )

  console.log("")

  console.log(`Testing complete. Passed ${passed}/${total} tests.`)

}

runAllTests()
 