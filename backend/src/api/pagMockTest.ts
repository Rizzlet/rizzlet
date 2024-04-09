import { Request, Response, NextFunction } from "express";
import { paginatedQuestions } from "./ptest";

// Mock Express request and response objects
const mockRequest = {} as Request;
const mockResponse = {} as Response;
const mockNext = jest.fn() as NextFunction; // If using Jest for testing, otherwise use a simple function

// Call your middleware function with the mock objects
paginatedQuestions(mockRequest, mockResponse, mockNext);

// Output the results or inspect the behavior
console.log("Mock response:", mockResponse);
