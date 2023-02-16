import "bootstrap/dist/css/bootstrap.min.css"
import Head from "next/head"
import { Container } from "react-bootstrap"
import TodoList from "../component/TodoList"
import "../styles/Home.module.css"
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react"
import { apiSlice } from "../api/apiSlice"

const style = {
  container: {
    minHeight: "100vh",
  },
}

export default function Home({ data }) {
  return (
    <Container
      style={style.container}
      className="m-auto my-5 d-flex justify-content-center align-items-center"
    >
      <Head>
        <title>Todo List </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ApiProvider api={apiSlice}>
        <TodoList dataSSR={data} />
      </ApiProvider>
    </Container>
  )
}

export async function getStaticProps(context) {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  const data = await res.json()
  console.log(data, "ini di server")
  return {
    props: { data },
    revalidate: 1,
  }
}
