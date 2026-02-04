interface IWizardControls {
    steps: string [];
    activeStep: number;
    skipped: Set<number>;
    isStepOptional?: (step: number) => boolean;
    isStepSkipped?: (step: number) => boolean;
    handleNext: () => void;
    handleBack: () => void;
    handleSkip?: () => void;
    handleReset?: () => void;
}

export default IWizardControls;
