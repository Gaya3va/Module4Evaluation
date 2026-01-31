const supabase = require("../config/db");

exports.createTrip = async (req, res) => {

  const { vehicle_id, passengers, distance_km } = req.body;

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicle_id)
    .single();

  if (!vehicle.isavailable) {
    return res.status(400).json({ msg: "Vehicle Not Available" });
  }

  if (passengers > vehicle.allowed_passengers) {
    return res.status(400).json({ msg: "Passenger Limit Exceeded" });
  }

  await supabase
    .from("vehicles")
    .update({ isAvailable: false })
    .eq("id", vehicle_id);

  const { data } = await supabase
    .from("trips")
    .insert([req.body]);

  res.json(data);
};


exports.updateTrip = async (req, res) => {

  const { tripId } = req.params;

  const { data } = await supabase
    .from("trips")
    .update(req.body)
    .eq("id", tripId);

  res.json(data);
};


exports.getTrip = async (req, res) => {

  const { tripId } = req.params;

  const { data } = await supabase
    .from("trips")
    .select("*")
    .eq("id", tripId)
    .single();

  res.json(data);
};


exports.deleteTrip = async (req, res) => {

  const { tripId } = req.params;

  await supabase
    .from("trips")
    .delete()
    .eq("id", tripId);

  res.json({ msg: "Deleted" });
};


exports.endTrip = async (req, res) => {

  const { tripId } = req.params;

  const { data: trip } = await supabase
    .from("trips")
    .select("*, vehicles(*)")
    .eq("id", tripId)
    .single();

  const cost = trip.distance_km * trip.vehicles.rate_per_km;

  await supabase.from("trips").update({
    isCompleted: true,
    tripCost: cost
  }).eq("id", tripId);

  await supabase.from("vehicles").update({
    isAvailable: true
  }).eq("id", trip.vehicle_id);

  res.json({ msg: "Trip Ended", cost });
};
