import * as React from "react"
import { Container, Row, Col } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: No encontrada" />
    <section css={css`height: 100vh;padding:2rem 0;`}>
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col>
            <H18 className="mb-0 text-center text-uppercase">Ruta no encontrada</H18>
          </Col>
        </Row>
      </Container>
    </section>
  </Layout>
)

export default NotFoundPage
