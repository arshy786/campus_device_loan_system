/*
Campus Device Loan System
Cloud Native DevOps (CIS3039-N)
Author: Arshad Aslam
Student ID: K0352250
Teesside University
API Service
Handles device listing and reservation requests.
*/
const express = require("express")
const app = express()
app.use(express.json())
app.use(express.static("public"))
let devices = [
{ id: 1, name: "Dell Laptop", available: 5 },
{ id: 2, name: "MacBook Pro", available: 3 },
{ id: 3, name: "HP Laptop", available: 4 },
{ id: 4, name: "Lenovo ThinkPad", available: 2 },
{ id: 5, name: "iPad Tablet", available: 3 },
{ id: 6, name: "Samsung Galaxy Tablet", available: 2 },
{ id: 7, name: "Canon Camera", available: 2 },
{ id: 8, name: "Sony Camera", available: 1 }
]
app.get("/devices", (req, res) => {
 res.json(devices)
})
app.get("/devices/:id", (req, res) => {
 const id = parseInt(req.params.id)
 const device = devices.find(d => d.id === id)
 if (!device) {
   return res.status(404).json({ message: "Device not found" })
 }
 res.json(device)
})
app.post("/reserve/:id", (req, res) => {
 const id = parseInt(req.params.id)
 const device = devices.find(d => d.id === id)
 if (!device) {
   return res.status(404).send("Device not found")
 }
if (device.available > 0) {
 device.available -= 1
 const fs = require("fs")
 const event = {
   type: "reservation_created",
   deviceId: device.id,
   deviceName: device.name,
   available: device.available
 }
 fs.writeFileSync("../worker/reservation-event.json", JSON.stringify(event, null, 2))
 return res.json({
   message: "Device reserved",
   device: device
 })
}
 res.status(400).send("No devices available")
})
app.listen(3000, () => {
 console.log("Device API running on port 3000")
})

app.get('/health', (req, res) => {

  res.json({

    status: "ok",

    service: "device-api",

    time: new Date()

  });

});

app.get('/admin', (req, res) => {
 return res.status(403).json({
   error: "Forbidden",
   message: "Admin access required"
 });
});