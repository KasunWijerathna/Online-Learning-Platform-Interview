import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";


const ContainerStyled = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const CardStyled = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const FormStyled = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });
  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    password: "00000",
    role: "student",
  });
  const [newEnrollment, setNewEnrollment] = useState({
    userId: "",
    courseId: "",
  });
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingEnrollment, setEditingEnrollment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get(
          "http://localhost:3000/api/courses",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourses(coursesResponse.data);

        const studentsResponse = await axios.get(
          "http://localhost:3000/api/students",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStudents(
          studentsResponse.data.filter((student) => student.role === "student")
        );

        const enrollmentsResponse = await axios.get(
          "http://localhost:3000/api/enrollments",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEnrollments(enrollmentsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleAddOrUpdate = async (entity, type) => {
    try {
      if (type === "course") {
        if (editingCourse) {
          const response = await axios.put(
            `http://localhost:3000/api/courses/${editingCourse.id}`,
            editingCourse,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setCourses(
            courses.map((course) =>
              course.id === editingCourse.id ? response.data : course
            )
          );
          setEditingCourse(null);
        } else {
          const response = await axios.post(
            "http://localhost:3000/api/courses",
            newCourse,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setCourses([...courses, response.data]);
          setNewCourse({ title: "", description: "" });
        }
      } else if (type === "student") {
        if (editingStudent) {
          const response = await axios.put(
            `http://localhost:3000/api/students/${editingStudent.id}`,
            editingStudent,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setStudents(
            students.map((student) =>
              student.id === editingStudent.id ? response.data : student
            )
          );
          setEditingStudent(null);
        } else {
          const response = await axios.post(
            "http://localhost:3000/api/auth/register",
            newStudent,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setStudents([...students, response.data]);
          setNewStudent({
            name: "",
            email: "",
            password: "00000",
            role: "student",
          });
        }
      } else if (type === "enrollment") {
        if (editingEnrollment) {
          const response = await axios.put(
            `http://localhost:3000/api/enrollments/${editingEnrollment.id}`,
            editingEnrollment,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setEnrollments(
            enrollments.map((enrollment) =>
              enrollment.id === editingEnrollment.id
                ? response.data
                : enrollment
            )
          );
          setEditingEnrollment(null);
        } else {
          const response = await axios.post(
            "http://localhost:3000/api/enrollments",
            newEnrollment,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setEnrollments([...enrollments, response.data]);
          setNewEnrollment({ userId: "", courseId: "" });
        }
      }
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "course") {
        await axios.delete(`http://localhost:3000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCourses(courses.filter((course) => course.id !== id));
      } else if (type === "student") {
        await axios.delete(`http://localhost:3000/api/students/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStudents(students.filter((student) => student.id !== id));
      } else if (type === "enrollment") {
        await axios.delete(`http://localhost:3000/api/enrollments/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEnrollments(
          enrollments.filter((enrollment) => enrollment.id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (entity, type) => {
    if (type === "course") setEditingCourse(entity);
    else if (type === "student") setEditingStudent(entity);
    else if (type === "enrollment") setEditingEnrollment(entity);
    setShowModal(true);
  };

  const handleClose = () => {
    setEditingCourse(null);
    setEditingStudent(null);
    setEditingEnrollment(null);
    setShowModal(false);
  };

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ContainerStyled>
      <AdminHeader />
      <div className="tab-content bg-secondary-subtle">
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Courses" />
        <Tab label="Students" />
        <Tab label="Enrollments" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        {/* Courses */}
        <CardStyled>
          <CardContent>
            <Typography variant="h5">Courses</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.description}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(course, "course")}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => handleDelete(course.id, "course")}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <FormStyled container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Title"
                  fullWidth
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  fullWidth
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddOrUpdate(newCourse, "course")}
                >
                  Add Course
                </Button>
              </Grid>
            </FormStyled>
          </CardContent>
        </CardStyled>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Students */}
        <CardStyled>
          <CardContent>
            <Typography variant="h5">Students</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Student Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(student, "student")}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => handleDelete(student.id, "student")}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <FormStyled container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  fullWidth
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={newStudent.email}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddOrUpdate(newStudent, "student")}
                >
                  Add Student
                </Button>
              </Grid>
            </FormStyled>
          </CardContent>
        </CardStyled>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Enrollments */}
        <CardStyled>
          <CardContent>
            <Typography variant="h5">Enrollments</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Course ID</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enrollments.map((enrollment) => (
                    <TableRow key={enrollment.id}>
                      <TableCell>{enrollment.userId}</TableCell>
                      <TableCell>{enrollment.courseId}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleEdit(enrollment, "enrollment")}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() =>
                            handleDelete(enrollment.id, "enrollment")
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <FormStyled container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="User ID"
                  fullWidth
                  value={newEnrollment.userId}
                  onChange={(e) =>
                    setNewEnrollment({
                      ...newEnrollment,
                      userId: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Course ID"
                  fullWidth
                  value={newEnrollment.courseId}
                  onChange={(e) =>
                    setNewEnrollment({
                      ...newEnrollment,
                      courseId: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddOrUpdate(newEnrollment, "enrollment")}
                >
                  Add Enrollment
                </Button>
              </Grid>
            </FormStyled>
          </CardContent>
        </CardStyled>
      </TabPanel>

      {/* Edit Dialog */}
      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle>
          Edit{" "}
          {editingCourse ? "Course" : editingStudent ? "Student" : "Enrollment"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update the information below and click "Update".
          </DialogContentText>
          {editingCourse && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                value={editingCourse.title}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, title: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                value={editingCourse.description}
                onChange={(e) =>
                  setEditingCourse({
                    ...editingCourse,
                    description: e.target.value,
                  })
                }
              />
            </>
          )}
          {editingStudent && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={editingStudent.name}
                onChange={(e) =>
                  setEditingStudent({ ...editingStudent, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={editingStudent.email}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    email: e.target.value,
                  })
                }
              />
            </>
          )}
          {editingEnrollment && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="User ID"
                type="text"
                fullWidth
                value={editingEnrollment.userId}
                onChange={(e) =>
                  setEditingEnrollment({
                    ...editingEnrollment,
                    userId: e.target.value,
                  })
                }
              />
              <TextField
                margin="dense"
                label="Course ID"
                type="text"
                fullWidth
                value={editingEnrollment.courseId}
                onChange={(e) =>
                  setEditingEnrollment({
                    ...editingEnrollment,
                    courseId: e.target.value,
                  })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleAddOrUpdate(
                editingCourse || editingStudent || editingEnrollment,
                editingCourse
                  ? "course"
                  : editingStudent
                  ? "student"
                  : "enrollment"
              )
            }
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </ContainerStyled>
    
  );
};

export default Admin;
