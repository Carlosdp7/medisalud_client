import * as React from "react"
import clientAxios from "../../axios/axios";
import Layout from "../../components/layout"
import TestForm from "../../components/test-form";
import { useLocation } from '@reach/router';

const SeeProduct = () => {
  const [test, setTest] = React.useState({});
  const location = useLocation();
  const id = location.search.substring(4);

  React.useEffect(() => {
    const fetchTest = async () => {
      const res = await clientAxios.get(`/test/obtain-test/${id}`)
      setTest(res.data.test)
    }
    fetchTest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <TestForm title="Ver Prueba" test={test} />
    </Layout>
  )
}

export default SeeProduct;