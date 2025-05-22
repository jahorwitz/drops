import React from 'react'
import { Steps } from '../../components/step-wizard/steps'
import Step from '../../components/step-wizard/step'
import { AccountCreationForm } from './account-creation-form'
import { AccountDetailForm } from './account-detail-form'

const Registration = () => {
    
    return (
        <div>
            <Steps totalSteps={2}>
                <Step stepNumber={1}>
                    <AccountCreationForm />
                </Step>
                <Step stepNumber={2}>
                    <AccountDetailForm />
                </Step>
            </Steps>
        </div>
    )
}

export default Registration