import * as React from "react"
import clientAxios from "../../axios/axios";
import Layout from "../../components/layout"
import TestForm from "../../components/test-form";
import { TestContext } from "../../context/TestContext";

const AddProduct = ({ serverData }) => {
  const { tests, setTestsFn } = React.useContext(TestContext);
  const firstTime = React.useRef(true);

  React.useEffect(() => {
    if (tests.length === 0 && firstTime.current) {
      setTestsFn(serverData)
      firstTime.current = false;
      return
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <TestForm title="Agregar Prueba" />
    </Layout>
  )
}

export default AddProduct

export async function getServerData() {
  try {
    const tests = await clientAxios.get('/test/obtain-tests');

    return {
      props: tests.data
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
