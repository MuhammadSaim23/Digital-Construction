import React from 'react'
import I1 from '../../images/card1.svg'
import I2 from '../../images/card2.svg'
import I3 from '../../images/card3.svg'
import I4 from '../../images/card4.svg'
import { ServicesContainer, ServicesH1 ,  ServicesWrapper , ServicesCard, 
ServicesIcon, ServicesH2, ServicesP} from './ServicesElements'

const Services = () => {
  return (
    <ServicesContainer id='services'>
        <ServicesH1>Our Services</ServicesH1>
        <ServicesWrapper>
            <ServicesCard>
                <ServicesIcon src={I1}/>
                <ServicesH2>Efficient Workforce Solutions</ServicesH2>
                <ServicesP>Find and hire reliable builders and inspectors who are dedicated to delivering high-quality work.  </ServicesP>
            </ServicesCard>
            {/* <ServicesCard>
                <ServicesIcon src={I2}/>
                <ServicesH2>Quality Construction Materials</ServicesH2>
                <ServicesP>Find trusted suppliers offering high-quality construction materials for your building requirements.</ServicesP>
            </ServicesCard> */}
            <ServicesCard>
                <ServicesIcon src={I3}/>
                <ServicesH2>Provide Your Services</ServicesH2>
                <ServicesP>You can work as Builder or Inspector to do construction and Inspection of different projects</ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={I4}/>
                <ServicesH2>Sell Your Construction Materials</ServicesH2>
                <ServicesP>Utilize our platform to effectively market and sell your construction products to our buyers.</ServicesP>
            </ServicesCard>
        </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services