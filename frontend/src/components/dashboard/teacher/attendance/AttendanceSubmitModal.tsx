'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { AttendanceSummary } from '@/types/attendance';

interface AttendanceSubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    summary: AttendanceSummary;
    isLoading: boolean;
}

export const AttendanceSubmitModal: React.FC<AttendanceSubmitModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    summary,
    isLoading,
}) => {
    if (!isOpen) return null;

    const hasUnmarked = summary.notMarked > 0;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                ></div>

                {/* Modal */}
                <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${hasUnmarked ? 'bg-orange-100' : 'bg-green-100'
                        }`}>
                        {hasUnmarked ? (
                            <AlertCircle className="w-8 h-8 text-orange-600" />
                        ) : (
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        )}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {hasUnmarked ? 'Incomplete Attendance' : 'Submit Attendance'}
                    </h2>

                    {/* Message */}
                    <p className="text-gray-600 mb-6">
                        {hasUnmarked
                            ? `You have ${summary.notMarked} student(s) not marked. Are you sure you want to submit?`
                            : 'Are you sure you want to submit the attendance?'}
                    </p>

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-gray-800 mb-3">Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Students:</span>
                                <span className="font-semibold text-gray-800">{summary.totalStudents}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Present:</span>
                                <span className="font-semibold text-green-600">{summary.present}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Absent:</span>
                                <span className="font-semibold text-red-600">{summary.absent}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Late:</span>
                                <span className="font-semibold text-orange-600">{summary.late}</span>
                            </div>
                            {hasUnmarked && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Not Marked:</span>
                                    <span className="font-semibold text-orange-600">{summary.notMarked}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Submitting...' : 'Confirm'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};