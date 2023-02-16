import React, { useState } from "react"
import { ButtonGroup, Form } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useAddNewPostMutation } from "../api/apiSlice"

export default function PostTodoList({ handleClose, show }) {
  const [addNewPost, response] = useAddNewPostMutation()
  const [data, setData] = useState({
    title: "",
    userId: 1,
    completed: "false",
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    data.completed = data.completed === "true" ? true : false

    console.log(data)
    addNewPost(data)
      .unwrap()
      .then(() => {
        handleClose()
      })
      .then((error) => {
        console.log(error)
      })
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Text>Title</Form.Text>
            <Form.Control
              onChange={handleChange}
              id="title"
              name="title"
              type="text"
              placeholder="Enter title..."
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Text>status</Form.Text>
            <Form.Select onChange={handleChange} name="completed">
              <option value={"false"}>Incomplete</option>
              <option value={"true"}>Completed</option>
            </Form.Select>
          </Form.Group>

          <ButtonGroup className="mb-4 d-flex justify-content-between">
            <Button
              className="mx-3 rounded"
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button className="mx-3 rounded" variant="primary" type="submite">
              Save
            </Button>
          </ButtonGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
