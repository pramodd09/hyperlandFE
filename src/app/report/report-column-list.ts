export const columnList = {

    "booking" : ["customerName", "agentName", "bookingDate", "projectName", "firmName", "block", "plotNumber", "totalAmount", "paymentDate", "plotSize", "sqftRate"],
    // "booking" : ["customerName", "agentName","projectName", "firmName", "block","block1","block2","block3"],

    "customer" : ["customerName", "agentName", "bookingDate", "projectName", "firmName", "block", "plotNumber", "totalAmount", "paymentDate", "plotSize", "sqftRate"],
    // "customer":["projectName","customerName", "agentName", "firmName", "block"],

    "transaction":["customerName","projectName", "agentName", "firmName", "block"],

    "propertyAvailable":["select","firmName","projectName","block","plotNo","plotSize","sqftRate","facing"],
    "propertyBooked":["select","firmName","projectName","block","plotNo","plotSize","sqftRate","bookedBy","bookedOn"],    
    "propertyHold":["select","firmName","projectName","block","plotNo","plotSize","sqftRate","holdBy","holdOn"],  

}