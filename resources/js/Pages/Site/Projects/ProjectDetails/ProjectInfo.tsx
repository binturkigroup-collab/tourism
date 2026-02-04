import React from 'react';
import ProjectProps from "@/Interfaces/Site/ProjectProps";
import { Card, CardContent, CardHeader, CardTitle } from "@/Pages/Site/components/ui/card";
import { Building2, Calendar, DollarSign} from "lucide-react";
import "reflect-metadata";
import {PaymentPlanEnum} from "@/Enums/PaymentPlanEnum";
import {useTranslation} from "react-i18next";

const ProjectInfo: React.FC<{project: ProjectProps}> = ({project}) => {
    const price = new Intl.NumberFormat().format(project.lunchPrice);
    const {t} = useTranslation();
    return (
        <Card className="bg-background">
            <CardHeader>
                <CardTitle className="text-primary">{t('proj-det')}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Building2 className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium">{t('dev')}</span>
                        </div>
                        <p className="text-primary font-semibold">{project.developerName}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium">{t('launch-date')}</span>
                        </div>
                        <p className="text-primary font-semibold">{project.lunchDate}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <DollarSign className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium">{t('start-price')}</span>
                        </div>
                        <p className="text-secondary font-bold text-xl">AED {price}</p>
                    </div>

                    <div>
                        <div className="text-muted-foreground mb-1 text-sm font-medium">{t('property-type')}</div>
                        <p className="text-primary font-semibold">{project.type}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <div className="text-muted-foreground mb-1 text-sm font-medium">{t('down-payment')}</div>
                        <p className="text-primary font-semibold">{project.downPayment}</p>
                    </div>

                    <div>
                        <div className="text-muted-foreground mb-1 text-sm font-medium">{t('construction-payment')}</div>
                        <p className="text-primary font-semibold">{project.constructionPaymentRate}</p>
                    </div>

                    <div>
                        <div className="text-muted-foreground mb-1 text-sm font-medium">{t('handover-payment')}</div>
                        <p className="text-primary font-semibold">{project.handoverPaymentRate}</p>
                    </div>

                    <div>
                        <div className="text-muted-foreground mb-1 text-sm font-medium">{t('payment-plan')}</div>
                        <p className="text-primary font-semibold">{PaymentPlanEnum[project.paymentPlanType]}</p>
                    </div>

                    <div>
                        <div className="text-muted-foreground mb-1 text-sm font-medium">{t('handover-date')}</div>
                        <p className="text-primary font-semibold">{project.handoverDate}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectInfo;
