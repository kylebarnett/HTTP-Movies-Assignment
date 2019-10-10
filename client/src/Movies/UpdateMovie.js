import React, { useState, useEffect } from 'react';
import axios from 'axios';


const initialFormData = {
  id: 0,
  title: "",
  director: "",
  metascore: 0,
  stars: []
}
const UpdateMovie = props => {
  const [values, setValues] = useState(initialFormData)

  const { match, movies } = props

  useEffect(() => {
    const id = match.params.id
    const valueToUpdate = movies.find(movie => {
      return `${movie.id}` === id
    })
    if (valueToUpdate) {
      console.log(valueToUpdate)
      setValues(valueToUpdate)
    }
  }, [match, movies])

  const changeHandler = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${values.id}`, values)
      .then(res =>
        props.history.push(`/movies/${values.id}`))
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>Update Movie!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="director"
          value={values.director}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="metascore"
          value={values.metascore}
          onChange={changeHandler}
        />
        {/* <input
          type="text"
          name="title"
        /> */}
        <button type="submit">Update Item</button>
      </form>
    </div>
  )
}

export default UpdateMovie