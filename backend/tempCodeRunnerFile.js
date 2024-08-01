catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            msg: "Internal server error",
        });
    }