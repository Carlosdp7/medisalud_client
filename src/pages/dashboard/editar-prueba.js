import * as React from "react"
import clientAxios from "../../axios/axios";
import Layout from "../../components/layout"
import TestForm from "../../components/test-form";
import { TestContext } from "../../context/TestContext";

const UpdateProduct = ({ serverData }) => {
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
      <TestForm title="Editar Prueba" test={serverData.test} />
    </Layout>
  )
}

export default UpdateProduct;

export async function getServerData(context) {
  try {
    const id = context.query.id
    const [test, tests] = await Promise.all([clientAxios.get(`/test/obtain-test/${id}`), clientAxios.get('/test/obtain-tests')]);

    return {
      props: { test: test.data.test, tests: tests.data }
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
