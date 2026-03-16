/*
Campus Device Loan System
Cloud Native DevOps (CIS3039-N)
Author: Arshad Aslam
Student ID: K0352250
Teesside University
API Service
Handles device listing, reservation requests, staff actions, subscriptions, and monitoring endpoints.
*/
const express = require("express")
const fs = require("fs")
const path = require("path")
const app = express()
app.use(express.json())
app.use(express.static("public"))
app.use((req, res, next) => {
 console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
 next()
})
let devices = [
 { id: 1, name: "Dell Laptop", category: "Laptop", available: 5 },
 { id: 2, name: "MacBook Pro", category: "Laptop", available: 3 },
 { id: 3, name: "HP Laptop", category: "Laptop", available: 4 },
 { id: 4, name: "Lenovo ThinkPad", category: "Laptop", available: 2 },
 { id: 5, name: "iPad Tablet", category: "Tablet", available: 3 },
 { id: 6, name: "Samsung Galaxy Tablet", category: "Tablet", available: 2 },
 { id: 7, name: "Canon Camera", category: "Camera", available: 2 },
 { id: 8, name: "Sony Camera", category: "Camera", available: 1 }
]
let reservations = []
let subscriptions = []
app.get("/devices", (req, res) => {
 res.json(devices)
})
app.get("/devices/available", (req, res) => {
 const availableDevices = devices.filter(d => d.available > 0)
 res.json(availableDevices)
})
app.get("/devices/:id", (req, res) => {
 const id = parseInt(req.params.id)
 const device = devices.find(d => d.id === id)
 if (!device) {
   return res.status(404).json({ message: "Device not found" })
 }
 res.json(device)
})
app.post("/login", (req, res) => {
 const { username, role } = req.body
 if (!username || !role) {
   return res.status(400).json({ message: "Username and role required" })
 }
 if (role !== "student" && role !== "staff") {
   return res.status(400).json({ message: "Role must be student or staff" })
 }
 res.json({
   message: "Login successful",
   username,
   role,
   token: `fake-token-${role}`
 })
})
app.post("/reserve/:id", (req, res) => {
 const id = parseInt(req.params.id)
 const device = devices.find(d => d.id === id)
 if (!device) {
   return res.status(404).json({ message: "Device not found" })
 }
 if (device.available <= 0) {
   return res.status(400).json({ message: "No devices available" })
 }
 device.available -= 1
 const returnDate = new Date()
 returnDate.setDate(returnDate.getDate() + 2)
 const reservation = {
   reservationId: reservations.length + 1,
   deviceId: device.id,
   deviceName: device.name,
   status: "reserved",
   returnDate: returnDate.toISOString().split("T")[0],
   timestamp: new Date().toISOString()
 }
 reservations.push(reservation)
 const event = {
   type: "reservation_created",
   deviceId: device.id,
   deviceName: device.name,
   available: device.available,
   returnDate: reservation.returnDate
 }
 fs.writeFileSync(
   path.join(__dirname, "../worker/reservation-event.json"),
   JSON.stringify(event, null, 2)
 )
 res.json({
   message: "Device reserved",
   reservation
 })
})
app.post("/subscribe", (req, res) => {
 const { email, model } = req.body
 if (!email || !model) {
   return res.status(400).json({ message: "Email and device model required" })
 }
 const subscription = {
   subscriptionId: subscriptions.length + 1,
   email,
   model,
   timestamp: new Date().toISOString()
 }
 subscriptions.push(subscription)
 res.json({
   message: "Subscription created",
   subscription
 })
})
app.post("/collect/:id", (req, res) => {
 const id = parseInt(req.params.id)
 const { role } = req.body
 if (role !== "staff") {
   return res.status(403).json({ message: "Staff access required" })
 }
 const reservation = reservations.find(
   r => r.deviceId === id && r.status === "reserved"
 )
 if (!reservation) {
   return res.status(404).json({ message: "Reservation not found" })
 }
 reservation.status = "collected"
 reservation.collectedAt = new Date().toISOString()
 res.json({
   message: "Device collected",
   reservation
 })
})
app.post("/return/:id", (req, res) => {
 const id = parseInt(req.params.id)
 const { role } = req.body
 if (role !== "staff") {
   return res.status(403).json({ message: "Staff access required" })
 }
 const reservation = reservations.find(
   r => r.deviceId === id && r.status === "collected"
 )
 const device = devices.find(d => d.id === id)
 if (!reservation || !device) {
   return res.status(404).json({ message: "Collected reservation not found" })
 }
 reservation.status = "returned"
 reservation.returnedAt = new Date().toISOString()
 device.available += 1
 const matchingSubscriptions = subscriptions.filter(
   s => s.model.toLowerCase() === device.name.toLowerCase()
 )
 const event = {
   type: "device_returned",
   deviceId: device.id,
   deviceName: device.name,
   available: device.available,
   returnedAt: reservation.returnedAt
 }
 fs.writeFileSync(
   path.join(__dirname, "../worker/reservation-event.json"),
   JSON.stringify(event, null, 2)
 )
 if (matchingSubscriptions.length > 0) {
   console.log("Notification triggered for:", matchingSubscriptions)
 }
 res.json({
   message: "Device returned",
   reservation,
   available: device.available
 })
})
app.get("/health", (req, res) => {
 res.json({
   status: "ok",
   service: "device-api",
   uptime: process.uptime(),
   timestamp: new Date().toISOString()
 })
})
app.get("/ready", (req, res) => {
 res.json({
   status: "ready",
   service: "device-api",
   timestamp: new Date().toISOString()
 })
})
app.get("/admin", (req, res) => {
 res.status(403).json({
   status: 403,
   error: "Forbidden",
   message: "Admin access required"
 })
})
app.listen(3000, () => {
 console.log("Device API running on port 3000")
})