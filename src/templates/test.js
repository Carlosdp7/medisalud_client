import * as React from "react"
import { Link } from 'gatsby';
import Layout from "../components/layout"
import { Container, Row, Col } from 'react-bootstrap';
import { StaticImage } from "gatsby-plugin-image";
import { css } from "@emotion/react";
import styled from '@emotion/styled';
import Moment from 'react-moment';

const P9 = styled.p`
  margin-bottom: 0rem;
  font-size: .1rem;
  @media(min-width: 370px){
  font-size: .2rem;
  }
  @media(min-width: 455px){
  font-size: .3rem;
  }
  @media(min-width: 992px){
    font-size: .6rem;
  }
  @media(min-width: 1400px){
    font-size: .8rem;
  }
`;

const Link9 = styled(Link)`
 margin: 0rem !important;
  font-size: .1rem;
  @media(min-width: 370px){
  font-size: .2rem;
  }
  @media(min-width: 455px){
  font-size: .3rem;
  }
  @media(min-width: 992px){
    font-size: .6rem;
  }
  @media(min-width: 1400px){
    font-size: .8rem;
  }
`;

const P16 = styled.p`
  margin-bottom: 0rem;
  font-size:.2rem;
  @media(min-width: 370px){
  font-size: .3rem;
  }
  @media(min-width: 455px){
  font-size:.4rem;
  }
  @media(min-width: 992px){
    font-size: .7rem;
  }
  @media(min-width: 1400px){
    font-size:1rem;
  }
`;

const H16 = styled.h6`
font-size:.2rem;
margin-bottom: 0rem;
@media(min-width: 370px){
  font-size: .3rem;
  font-weight: bold !important; 
  }
@media(min-width: 455px){
  font-size:.4rem;
  }
@media(min-width: 992px){
    font-size: .7rem;
  }
  @media(min-width: 1400px){
    font-size:1rem;
  }
`;

const H17 = styled.h6`
font-size:.4rem;
@media(min-width: 370px){
  font-size: .5rem;
  }
@media(min-width: 455px){
  font-size:.6rem;
  }
@media(min-width: 992px){
    font-size: .9rem;
  }
  @media(min-width: 1400px){
    font-size:1.2rem;
  }
`;

const H18 = styled.h1`
  font-size:.8rem;
  @media(min-width: 370px){
  font-size: .9rem;
  }
  @media(min-width: 455px){
  font-size:1rem;
  }
  @media(min-width: 992px){
    font-size: 1.3rem;
  }
  @media(min-width: 1400px){
    font-size:2rem;
  }
`

const Test = ({ pageContext }) => {
  const convertMilitaryToStandardTime = (value) => {
    const [hour, minutes] = value.split(':');

    let newValue;
    if (Number(hour) >= 12) {

      const newHour = Number(hour) === 12 ? hour : hour - 12;

      newValue = `${newHour}:${minutes} pm`;

    } else {
      newValue = `${Number(hour) === 12 ? value : value.substring(1)} am`;
    }
    value = newValue;
    return value;
  }

  if (!pageContext.isValid || pageContext.isDelete) {
    return (
      <Layout>
        <section css={css`height: 100vh;padding:2rem 0;`}>
          <Container className="h-100">
            <Row className="h-100 justify-content-center align-items-center">
              <Col>
                <H18 className="mb-0 text-center text-uppercase">Prueba Vencida</H18>
                {/* <p className="text-center">Para más información contactar a</p> */}
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    )
  }

  return (
    <Layout>
      <section css={css`min-height: 100vh;padding:2rem 0;`}>
        <Container>
          <Row className="justify-content-center pb-3 pb-lg-5">
            <Col xs={11} sm={10}>
              <Row className="align-items-center gx-0" >
                <Col xs={{ offset: 2, span: 2 }}>
                  <div className="text-center">
                    <StaticImage
                      src="../images/logo-medisalud-sin-letras.jpg"
                      width={150}
                      quality={95}
                      formats={["webp"]}
                      alt="Medisalud Logo"
                    />
                  </div>
                </Col>
                <Col xs={6} className="text-center">
                  <div className="w-100 ps-2 ps-lg-4 d-flex justidy-content-start">
                    <div>
                      <H18 className="mb-0">MEDISALUD</H18>
                      <P9 className="mb-0">
                        Calle Boyaca entre Av. 34 y Piar, Al lado del Hospital<br />
                        Pedro García Clara, Ciudad Ojeda, Edo. Zulia<br />
                        Teléfonos: 0412 6860385 - 0265 4167146<br />
                        RIF: J-50061918-9
                      </P9>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center pt-2 pt-lg-4">
            <Col className="pb-2 pb-lg-3 pt-1" xs={11} sm={10} css={css`border: 1px solid #000;@media(min-width: 992px){border: 3px solid #000;}`}>
              <Row className="gx-0">
                <Col xs={3} className="mb-2 mb-lg-4">
                  <div >
                    <P16>
                      <span className="fw-bold me-1">Paciente:</span>
                      <span>{`${pageContext.firstname} ${pageContext.lastname}`}</span>
                    </P16>
                  </div>
                </Col>
                <Col xs={3} className="mb-2 mb-lg-4">
                  <div >
                    <P16>
                      <span className="fw-bold me-1">CI/Pasaporte:</span>
                      <span>{pageContext.di}</span>
                    </P16>
                  </div>
                </Col>
                <Col xs={3} className="mb-2 mb-lg-4">
                  <div >
                    <P16>
                      <span className="fw-bold me-1">Sexo y Edad:</span>
                      <span className="me-2">{pageContext.gender}</span> <span>{pageContext.age} años</span>
                    </P16>
                  </div>
                </Col>
                <Col xs={3} className="mb-2 mb-lg-4">
                  <div >
                    <P16>
                      <span className="fw-bold me-1">Ingreso:</span>
                      <span>
                        <Moment format="DD/MM/YYYY">
                          {pageContext.createdAt}
                        </Moment>
                      </span>
                    </P16>
                  </div>
                </Col>
              </Row>
              <Row className="gx-0">
                <Col xs={6}>
                  <div>
                    <P16>
                      <span className="fw-bold me-1">Dir:</span>
                      <span>{pageContext.address}</span>
                    </P16>
                  </div>
                </Col>
                <Col xs={3}>
                  <div>
                    <P16>
                      <span className="fw-bold me-1">Telf:</span>
                      <span>{pageContext.phone}</span>
                    </P16>
                  </div>
                </Col>
                <Col xs={3}>
                  <div>
                    <P16>
                      <span className="fw-bold me-1">Hora:</span>
                      <span>
                        {convertMilitaryToStandardTime(pageContext.time)}
                      </span>
                    </P16>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center pt-1 pt-lg-2">
            <Col className="py-1" xs={11} sm={10} css={css`border: 1px solid #000;@media(min-width: 992px){border: 3px solid #000;}`}>
              <Row className="gx-0">
                <Col xs={6}>
                  <H16 css={css`font-weight: bold;`}>Descripción del Examen</H16>
                </Col>
                <Col xs={6}>
                  <H16 css={css`font-weight: bold;`}>Resultado</H16>
                </Col>
              </Row>

            </Col>
            <Col className="py-2 py-lg-4" xs={11} sm={10}>
              <Row className="gx-0">
                <Col xs={6}>
                  <P16>ANTIGENO SARS-COVID 2 <br />
                    HISOPADO NASOFARINGEO
                  </P16>
                </Col>
                <Col xs={6}>
                  <P16>{pageContext.result ? 'POSITIVO' : 'NEGATIVO'}</P16>
                </Col>
              </Row>

            </Col>
          </Row>

          <Row className="justify-content-center pt-2 pt-lg-4">
            <Col xs={11} sm={10}>
              <Row >
                <Col xs={12} className="mb-3 mb-lg-4">
                  <P16>Si tu resultado es SARS-COVID 2 Detectable (Positivo) Correlaciones clínicas con la historia del paciente y otras informaciones diagnosticas deben ser realizadas para determinar el status de la infección. Tomar en cuenta las siguientes recomendaciones:</P16>
                </Col>
                <Col xs={12}>
                  <P16 className="mb-1">Aislamiento radical.</P16>
                  <P16 className="mb-1">Consulta con un neumólogo.</P16>
                  <P16 className="mb-1">Iniciar Tratamiento.</P16>
                  <P16 className="mb-1">Rayos X o Tomografía de tórax.</P16>
                  <P16 className="mb-1">Evita el contacto con otros miembros de la familia.</P16>
                  <P16 className="mb-1">Descarte del núcleo familiar o con personas que hayan tenido contacto en los últimos 7 días.</P16>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="justify-content-center gx-0" css={css`padding-top:8rem; @media(min-width: 992px) {padding-top: 20rem;}`}>
            <Col xs={11} sm={10}>
              <div className="d-flex justify-content-end text-center">
                <div>
                  <H17 className="mb-0">Dr. Yosber Gómez</H17>
                  <P16 className="mb-0">Doctor (a)</P16>
                  <P16>M.P.P.S: 73022 COMEZU: 13806</P16>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center gx-0">
            <Col xs={11} sm={10} className="pt-2 pt-lg-4 mt-2 mt-lg-4 border-top">
              <Row>
                <Col xs={3} md={4} className="d-flex flex-column justify-content-center align-items-start">
                  <div className="mb-0">
                    <StaticImage
                      src="../images/logo-sienna.png"
                      width={150}
                      quality={95}
                      formats={["webp"]}
                      alt="Artron Logo"
                    />
                  </div>
                  <P9>T&D Diagnostics Canada Pvt. Ltd</P9>
                  <Link9 to="http://www.td-diagnostics.com" target="_blank" rel="noopener noreferrer">www.td-diagnostics.com</Link9>
                  <P9>Ref. 102241</P9>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section >
    </Layout >
  )
}

export default Test
