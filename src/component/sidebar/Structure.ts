import { ROLE } from '../../enum/Role.tsx'

const sidebarStructure = [
    {
        id: "dashboard",
        title: "Trang chủ",
        name: "Dashboard",
        parent: true,
        icon: "dasbor",
        link: "/",
        role: [ROLE.INSTRUCTOR, ROLE.STUDENT, ROLE.ADMIN]
    },

    // ADMIN
    {
        id: "user_list",
        title: "Quản lý người dùng",
        name: "users",
        parent: true,
        icon: "users",
        role: [ROLE.ADMIN],
        child: [
            {
                id: "student",
                title: "Sinh viên",
                name: "users.student",
                link: "/quan-ly-sinh-vien",
                icon: "dot",
                role: [ROLE.ADMIN]
            },
            {
                id: "instructor",
                title: "Giảng viên",
                name: "users.instructor",
                link: "/quan-ly-giang-vien",
                icon: "dot",
                role: [ROLE.ADMIN]
            }
        ]
    },
    {
        id: "clazz-management",
        title: "Quản lý học tập",
        name: "studyManagement",
        parent: true,
        icon: "clazz",
        role: [ROLE.ADMIN],
        child: [
            {
                id: "clazz",
                title: "Quản lý lớp học",
                name: "studyManagement.clazz",
                link: "/quan-ly-lop-hoc",
                icon: "dot",
                role: [ROLE.ADMIN]
            },
            {
                id: "Testday",
                title: "Quản lý ngày kiểm tra",
                name: "studyManagement.Testday",
                link: "/quan-ly-ngay-kiem-tra",
                icon: "dot",
                role: [ROLE.ADMIN]
            },
            {
                id: "schedule",
                title: "Quản lý lịch học",
                name: "studyManagement.schedule",
                link: "/quan-ly-lich-hoc",
                icon: "dot",
                role: [ROLE.ADMIN]
            },
            {
                id: "semester",
                title: "Quản lý học kỳ",
                name: "studyManagement.semester",
                link: "/quan-ly-hoc-ky",
                icon: "dot",
                role: [ROLE.ADMIN]
            }
        ]
    },

    // STUDENT

    {
        id: "study",
        title: "Học tập",
        name: "study",
        parent: true,
        icon: "study",
        role: [ROLE.STUDENT],
        child: [
            {
                id: "course-registration",
                title: "Đăng ký môn học",
                name: "study.course-registration",
                link: "/dang-ky-mon-hoc",
                icon: "dot",
                role: [ROLE.STUDENT]
            },
            {
                id: "course-registration",
                title: "Đổi lịch học",
                name: "study.change-schedule",
                link: "/doi-lich-hoc",
                icon: "dot",
                role: [ROLE.STUDENT]
            },
            {
                id: "schedule-child",
                title: "Lịch học",
                name: "study.schedule-child",
                link: "/lich-hoc",
                icon: "dot",
                role: [ROLE.STUDENT]
            },
            {
                id: "exam-schedule",
                title: "Lịch thi",
                name: "study.exam-schedule",
                link: "/lich-thi",
                icon: "dot",
                role: [ROLE.STUDENT]
            },
            {
                id: "exam-schedule",
                title: "Môn học hiện tại",
                name: "study.current-subject",
                link: "/mon-hoc-hien-tai",
                icon: "dot",
                role: [ROLE.STUDENT]
            }
        ]
    },
    {
        id: "learning-outcomes",
        title: "Kết quả học tập",
        name: "learning-outcomes",
        parent: true,
        icon: "learning-outcomes",
        role: [ROLE.STUDENT],
        child: [
            {
                id: "learning-history",
                title: "Lịch sử học tập",
                name: "learning-outcomes.learning-history",
                link: "/lich-su-hoc-tap",
                icon: "dot",
                role: [ROLE.STUDENT]
            },
            {
                id: "transcript",
                title: "Bảng điểm",
                name: "learning-outcomes.transcript",
                link: "/bang-diem",
                icon: "dot",
                role: [ROLE.STUDENT]
            }
        ]
    },
    {
        id: "calendar",
        title: "Lịch",
        name: "calendar",
        parent: true,
        icon: "calendar",
        link: "/lich",
        role: [ROLE.STUDENT]
    },
    {
        id: "find",
        title: "Tìm kiếm môn học",
        name: "find",
        parent: true,
        icon: "find",
        link: "/tim-kiem-mon-hoc",
        role: [ROLE.STUDENT]
    },

    // INSTRUCTOR
    {
        id: "clazz_list_manage",
        title: "Quản lý lớp học",
        name: "clazz_list_manage",
        parent: true,
        icon: "clazz",
        role: [ROLE.INSTRUCTOR],
        child: [
            {
                id: "student",
                title: "Danh sách sinh viên",
                name: "clazz_list_manage.student",
                link: "/danh-sach-sinh-vien",
                icon: "dot",
                role: [ROLE.INSTRUCTOR]
            },
            {
                id: "attendance",
                title: "Điểm danh",
                name: "clazz_list_manage.attendance",
                link: "/diem-danh",
                icon: "dot",
                role: [ROLE.INSTRUCTOR]
            }
        ]
    },
    {
        id: "teach",
        title: "Giảng dạy",
        name: "teach",
        parent: true,
        icon: "teach",
        role: [ROLE.INSTRUCTOR],
        child: [
            {
                id: "teachManage",
                title: "Quản lý giảng dạy",
                name: "teach.teachManage",
                link: "/quan-ly-giang-day",
                icon: "dot",
                role: [ROLE.INSTRUCTOR]
            },
            {
                id: "teachDay",
                title: "Ngày giảng dạy",
                name: "teach.teachDay",
                link: "/ngay-giang-day",
                icon: "dot",
                role: [ROLE.INSTRUCTOR]
            },
            {
                id: "offedReplace",
                title: "Đặt lại lịch nghỉ",
                name: "teach.offedReplace",
                link: "/dat-lai-lich-nghi",
                icon: "dot",
                role: [ROLE.INSTRUCTOR]
            },
            {
                id: "examArrange",
                title: "Thay đổi lịch thi",
                name: "teach.examArrange",
                link: "/thay-doi-lich-thi",
                icon: "dot",
                role: [ROLE.INSTRUCTOR]
            }
        ]
    },
    {
        id: "find",
        title: "Tìm kiếm môn học",
        name: "find",
        parent: true,
        icon: "find",
        link: "/tim-mon-hoc",
        role: [ROLE.INSTRUCTOR]
    },
];

export { sidebarStructure };
