import axiosInstance from "../axios/axiosConfig";
import { AttendanceSession, AttendanceRecord } from "@/types/attendance";

const attendanceApi = {

    //get students for attendance
    getStudentForAttendance: async (classId: string, date: string): Promise<AttendanceRecord[]> => {
        const response = await axiosInstance.get(
            `/api/attendance/students/?class=${classId}&date=${date}`
        );
        return response.data;
    },

    //attendance submition
    submitAttendance: async(data: AttendanceSession): Promise<AttendanceSession> => {
        const response = await axiosInstance.post(
            '/api/attendance/submit/', data
        );
        return response.data;
    },

    //update attendance
    updateAttendance: async(data: AttendanceSession): Promise<AttendanceSession> => {
        const response = await axiosInstance.patch(
            `/api/attendance/${data.id}/`, data
        );
        return response.data;
    },

    getTeacherClasses: async(): Promise<{ id: string; name: string }[]> => {
        const response = await axiosInstance.get(   
            '/api/classes/'
        );
        return response.data;
    }
}