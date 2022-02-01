import * as React from "react"
import clientAxios from "../../axios/axios";
import Layout from "../../components/layout"
import TestForm from "../../components/test-form";

const SeeProduct = ({ serverData }) => {
  return (
    <Layout>
      <TestForm title="Ver Prueba" test={serverData} />
    </Layout>
  )
}

export default SeeProduct;

export async function getServerData(context) {
  try {
    const id = context.query.id
    const res = await clientAxios.get(`/test/obtain-test/${id}`);

    return {
      props: res.data.test
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}