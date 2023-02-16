import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react"
import { Button, Card, Col, FormSelect, Row } from "react-bootstrap"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { MdDelete, MdEdit } from "react-icons/md"
import ReactPaginate from "react-paginate"
import "../styles/Home.module.css"
import { useGetPostsQuery } from "../api/apiSlice"
import PostTodoList from "./PostTodoList"
import { useSelector } from "react-redux"

function TodoList({ dataSSR }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [page, setPage] = useState(1)
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useGetPostsQuery({ page: page, limit: 10 })

  const pages = posts?.length
  // const pages = dataSSR?.length
  console.log(dataSSR)

  const pageCount = 20
  const handlePageClick = (event) => {
    const selectPage = event.selected + 1

    setPage(selectPage)
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center ">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }

  return (
    <main className="w-100 main-home">
      <h1 className="title text-center fw-bold mt-2">Todo List</h1>
      <Card className="border-0">
        <Card.Body>
          <Row className="my-3 w-100 p-0 mx-0">
            <Col>
              <Button className="btn btn-success" onClick={handleShow}>
                Add Task
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <FormSelect className="w-25 shadow-sm bg-light border-1">
                <option value="all">All</option>
                <option value="false">Incomplete</option>
                <option value="true">Completed</option>
              </FormSelect>
            </Col>
          </Row>
          <Card className="shadow-sm border-1">
            {/* {dataSSR.map((item) => ( //data SSR */}
            {posts.map((item) => (
              <Row key={item.id} className="shadow-sm m-4 mb-0 p-2 m-0 rounded">
                <Col
                  md={1}
                  className="d-flex align-items-center justify-content-center"
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    style={{ width: "25px", height: "25px" }}
                  />
                </Col>
                <Col md={8} className="d-flex align-items-center">
                  <Card.Title className="m-0">
                    {item.title} {item.id}
                  </Card.Title>
                </Col>
                <Col
                  md={3}
                  className="d-flex align-items-center justify-content-end"
                >
                  <Button className="px-2 py-1 btn-danger">
                    <MdDelete />
                  </Button>
                  <Button className="mx-3 px-2 py-1 btn-success">
                    <MdEdit />
                  </Button>
                </Col>
              </Row>
            ))}
            <Card.Footer
              className="border-0 d-flex align-items-center mt-4"
              style={{
                background: "none",
              }}
            >
              <Row className="w-100 p-0 m-0">
                <Col>
                  <Card.Title>
                    Total Todo : <b>{pages} List</b>
                  </Card.Title>
                </Col>
                <Col className="d-flex justify-content-end align-items-center">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<FaArrowRight />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    forcePage={page - 1}
                    renderOnZeroPageCount={null}
                    previousLabel={<FaArrowLeft />}
                    containerClassName="pagination pagination-sm"
                    pageLinkClassName="page-link inputOutline "
                    nextLinkClassName="page-link inputOutline"
                    previousLinkClassName="page-link inputOutline"
                    activeClassName="page-item active inputOutline"
                  />
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Card.Body>
      </Card>
      <PostTodoList handleClose={handleClose} show={show} />
    </main>
  )
}

export default TodoList
