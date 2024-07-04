// This is the form component

export default function form() {
  // we need state to save the form data
  // formData = {key: value, key: value}

  // no need useEffect here

  // a handle submit function
  // function handleSubmit() {
  //prevent default
  //fetch post to the endpoint
  //     fetch("url", {method: "POST", body: JSON.stringify(formData), headers: {"Content-Type": "application/json"}})
  // }
  // a handle change function
  // function handleChange(e) {
  // we need to add the values from the initial state
  // we need to set the properties for the new object
  // setFormData({...formData, [e.target.name]: e.target.value})
  return (
    <>
      {/* you need to have a form here with two events: one to submit, one to track changes */}
      {/* remeber to be consitent with how you name the name attribute!!! the same attribute in your input....................... */}
    </>
  );
}
