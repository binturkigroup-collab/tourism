import {Service} from "typedi";
import axios from "axios";
import Appointment from "@/models/block/Appointment";

@Service()
class AppointmentService {

    store(formData: FormData) {
        return axios.post(
            "/admin/appointments/create",
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        );
    }

    update(formData: FormData, appointmentId: number) {
        return axios.post<{
            status: string,
            message: string,
            appointment: Appointment,
        }>(
            `/admin/appointments/update/${appointmentId}?_method=PATCH`,
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        );
    }

    destroy(appointmentId: number, formData: FormData) {
        return axios.post(
            `/admin/appointments/delete/${appointmentId}?_method=DELETE`,
            formData,
            {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                }
            }
        );
    }
}

export default AppointmentService;
