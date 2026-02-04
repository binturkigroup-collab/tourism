import React, {useState} from 'react';
import {Container} from "typedi";
import BlockService from "@/Services/BlockService/BlockService";
import CommonService from "@/Services/CommonService/CommonService";
import {Link} from "@inertiajs/react";
import {Box, Typography, Breadcrumbs, Tab} from "@mui/material";
import {TabList, TabContext, TabPanel} from "@mui/lab";
import Project from "@/models/block/Project";
import { Block } from '@/models/block/Block';
import BasicInfo from "@/Pages/Admin/Tourism/Trips/TripUpdate/BasicInfo";
import Trip from "@/models/block/Trip";
import Gallery from "@/Pages/Admin/Tourism/Trips/TripUpdate/Gallery";
import Appointments from "@/Pages/Admin/Tourism/Trips/TripUpdate/Appointments";
// import BasicInfo from "@/Pages/Admin/RealEstate/Projects/projectsUpdate/BasicInfo";
// import ProjectGallery from "@/Pages/Admin/RealEstate/Projects/projectsUpdate/ProjectGallery";
// import ProjectsLead from "@/Pages/Admin/RealEstate/Projects/projectsUpdate/ProjectsLead";
// import ProjectAttachments from "@/Pages/Admin/RealEstate/Projects/projectsUpdate/ProjectAttachments";

const TripUpdate: React.FC<{category: string, block: Trip}> = ({category, block}) => {
    const blockService = Container.get(BlockService);
    const commonService = Container.get(CommonService);
    const [selectedBlock, setSelectedBlock] = useState<Trip>({...block});

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const handleBlockChange = (block: Trip) => {
        setSelectedBlock({...block});
    }
    return (
        <Box>
            <Breadcrumbs>
                <Link href={`/admin/get-block/` + block.category}>Back to {commonService.toTitleCase(block.category)}</Link>
                <Typography>Update {blockService.getBlockName(selectedBlock)}</Typography>
            </Breadcrumbs>
            <Box className="p-[16px]">
                <Typography variant="h5">Update {blockService.getBlockName(selectedBlock)}</Typography>
            </Box>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" textColor={'secondary'} indicatorColor={'secondary'}>
                            <Tab label="Basic Information" value="1" />
                            <Tab label="Gallery" value="2" />
                            <Tab label="Appointments" value="3"></Tab>
                            {/*<Tab label={`Leads(${block.leadsCount})`} value="4" />*/}
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <BasicInfo category={category} block={selectedBlock} handleBlockChange={handleBlockChange}></BasicInfo>
                    </TabPanel>
                    <TabPanel value="2"><Gallery block={block}></Gallery></TabPanel>
                    <TabPanel value="3"><Appointments
                        appointments={block.appointments}
                        count={block.appointments.length}
                    ></Appointments></TabPanel>
                </TabContext>
            </Box>

            {/*<BasicInfo category={category} block={block} handleBlockChange={handleBlockChange}></BasicInfo>*/}
        </Box>

    );
};

export default TripUpdate;
