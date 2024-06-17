import {
  Checkbox,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";

const ContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const Enrollments = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEnrollments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/enrollments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEnrollments(
          response.data.filter(
            (enrollment) =>
              enrollment.userId === parseInt(localStorage.getItem("userId"))
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
    fetchEnrollments();
  }, []);

  const handleToggleEnrollment = async (courseId, checked) => {
    try {
      if (checked) {
        // Create enrollment
        const response = await axios.post(
          "http://localhost:3000/api/enrollments",
          { userId: localStorage?.getItem("userId"), courseId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEnrollments([...enrollments, response.data]);
      } else {
        // Find enrollment to delete
        const enrollmentToDelete = enrollments.find(
          (enrollment) =>
            enrollment.userId === localStorage.getItem("userId") &&
            enrollment.courseId === courseId
        );
        if (enrollmentToDelete) {
          await axios.delete(
            `http://localhost:3000/api/enrollments/${enrollmentToDelete.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setEnrollments(
            enrollments.filter(
              (enrollment) => enrollment.id !== enrollmentToDelete.id
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContainerStyled>
      <UserHeader />
      <Typography variant="h2" gutterBottom>
        Enrollments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course ID</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Enrolled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={enrollments.some(
                      (enrollment) => enrollment.courseId === course.id
                    )}
                    onChange={(e) =>
                      handleToggleEnrollment(course.id, e.target.checked)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ContainerStyled>
  );
};

export default Enrollments;
