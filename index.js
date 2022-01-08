import express from "express";
const app=express();
app.use(express.json());

const PORT=process.env.PORT || 6000;
app.listen(PORT,()=>console.log("listening to",PORT));

var customers=[{Customer_name:"name",Room_name:"3AD",Date:"date",Start_time:"start_time",End_time:"end_time"}];
var rooms_booked=[{Customer_name:"name",Room_name:"A",Booked_Status:"",Date:"date",Start_time:"start_time",End_time:"end_"}];
var rooms=[{Seats:46,Amenities:["Podium","A/C","Snacks"],Price_per_hour:"Rs.5000"}]

app.get("/customers",async(request,response)=>{
    response.send(customers);
});
app.get("/allrooms",async(request,response)=>{
    response.send(rooms_booked);
});
app.post("/reserve",async(request,response)=>{
    const details=(request.body);
    if(details.Customer_name && details.Room_name && details.Start_time && details.End_time && details.Date){
        for(let i in rooms_booked){
            if(rooms_booked[i].Room_name===details.Room_name && rooms_booked[i].Start_time===details.Start_time){
                response.send({"message":"Slot unavailable"});
                break;
            }
        }
    rooms_booked.push(details);
    response.send({"message":"Slot booked"});
    }else response.send({"error":"Enter all the details correctly"})
});
app.post("/create",async(request,response)=>{
    const Nroom=request.body;
    if(Nroom.Seats && Nroom.Amenities && Nroom.Price_per_hour){
        response.send({"message":"Room added"});
        rooms.push(Nroom);
    }else response.send({"error":"Enter all the details"});
});

