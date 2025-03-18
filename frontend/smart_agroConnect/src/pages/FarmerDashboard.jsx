import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const FarmerDashboard = () => {
  const [commodities, setCommodities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [editingCommodity, setEditingCommodity] = useState(null);

  useEffect(() => {
    fetchCommodities();
  }, []);

  const fetchCommodities = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/commodities/farmer",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCommodities(data);
    } catch (error) {
      console.error("Error fetching commodities:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      images.forEach((image) => formData.append("images", image));
      formData.append("price", price);
      formData.append("location", location);

      if (editingCommodity) {
        await axios.put(
          `http://localhost:5000/api/commodities/update/${editingCommodity._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/commodities/add",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      setName("");
      setDescription("");
      setImages([]);
      setPrice("");
      setLocation("");
      setEditingCommodity(null);
      fetchCommodities();
    } catch (error) {
      console.error("Error adding/updating commodity:", error);
    }
  };

  const handleEdit = (commodity) => {
    setName(commodity.name);
    setDescription(commodity.description);
    setImages([]);
    setPrice(commodity.price);
    setLocation(commodity.location);
    setEditingCommodity(commodity);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/commodities/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCommodities();
    } catch (error) {
      console.error("Error deleting commodity:", error);
    }
  };

  const columns = [
    {
      name: "Commodity Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Images",
      cell: (row) => (
        <div>
          {row.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:5000/${image}`}
              alt="commodity"
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
            />
          ))}
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button
            variant="warning"
            size="sm"
            className="me-2"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container className="mt-4">
      <h1 className="display-4">Farmer Dashboard</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Commodity Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          {editingCommodity ? "Update Commodity" : "Add Commodity"}
        </Button>
      </Form>

      <div className="mt-4">
        <h2>Your Commodities</h2>
        <DataTable
          columns={columns}
          data={commodities}
          pagination
          highlightOnHover
        />
      </div>
    </Container>
  );
};

export default FarmerDashboard;
