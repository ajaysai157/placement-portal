import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },

    profile: {
      phone: {
        type: String,
        default: "",
      },

      college: {
        type: String,
        default: "",
      },

      branch: {
        type: String,
        default: "",
      },

      graduationYear: {
        type: Number,
      },

      cgpa: {
        type: Number,
      },

      skills: {
        type: [String],
        default: [],
      },

      bio: {
        type: String,
        default: "",
      },

      github: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      companyName: {
        type: String,
        default: "",
      },

      designation: {
        type: String,
        default: "",
      },

      companyWebsite: {
        type: String,
        default: "",
      },

      companyDescription: {
        type: String,
        default: "",
      },

      resume: {
        public_id: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "",
        },
      },

      profilePicture: {
        public_id: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "",
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
