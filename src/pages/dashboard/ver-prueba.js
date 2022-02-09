import * as React from "react"
import clientAxios from "../../axios/axios";
import Layout from "../../components/layout"
import TestForm from "../../components/test-form";

const SeeProduct = ({ serverData }) => {

  const [test, setTest] = React.useState(null);

  // React.useEffect(() => {
  //   const fetchTest = async () => {
  //     const res = await clientAxios.get(`/test/obtain-test/${serverData.id}`)
  //     setTest(res.data.test)
  //   }
  //   fetchTest()

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return (
    <Layout>
      <TestForm title="Ver Prueba" test={test} />
    </Layout>
  )
}

export default SeeProduct;

// export async function getServerData(context) {
//   try {
//     const id = context.query.id
//     const res = await clientAxios.get(`/test/obtain-test/${id}`);

//     return {
//       props: { test: res.data.test, id }
//     }
//   } catch (error) {
//     return {
//       status: 500,
//       headers: {},
//       props: {},
//     }
//   }
// }