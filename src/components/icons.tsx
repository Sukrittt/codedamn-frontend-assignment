import {
  Bell,
  Chrome,
  HeartPulse,
  Info,
  Loader2,
  LogOut,
  LucideProps,
  Search,
  Sparkle,
  Trophy,
  User,
  X,
  Zap,
} from "lucide-react";

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      {...props}
      width="125"
      height="32"
      viewBox="0 0 125 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.36364 25.2557C6.02273 25.2557 4.86932 24.9716 3.90341 24.4034C2.94318 23.8295 2.20455 23.0341 1.6875 22.017C1.17614 21 0.920455 19.8295 0.920455 18.5057C0.920455 17.1648 1.17898 15.9886 1.69602 14.9773C2.21875 13.9602 2.96023 13.1676 3.92045 12.5994C4.88068 12.0256 6.02273 11.7386 7.34659 11.7386C8.48864 11.7386 9.48864 11.946 10.3466 12.3608C11.2045 12.7756 11.8835 13.358 12.3835 14.108C12.8835 14.858 13.1591 15.7386 13.2102 16.75H9.78409C9.6875 16.0966 9.43182 15.571 9.01705 15.1733C8.60795 14.7699 8.07102 14.5682 7.40625 14.5682C6.84375 14.5682 6.35227 14.7216 5.93182 15.0284C5.51705 15.3295 5.19318 15.7699 4.96023 16.3494C4.72727 16.929 4.6108 17.6307 4.6108 18.4545C4.6108 19.2898 4.72443 20 4.9517 20.5852C5.18466 21.1705 5.51136 21.6165 5.93182 21.9233C6.35227 22.2301 6.84375 22.3835 7.40625 22.3835C7.82102 22.3835 8.19318 22.2983 8.52273 22.1278C8.85795 21.9574 9.13352 21.7102 9.34943 21.3864C9.57102 21.0568 9.71591 20.6619 9.78409 20.2017H13.2102C13.1534 21.2017 12.8807 22.0824 12.392 22.8438C11.9091 23.5994 11.2415 24.1903 10.3892 24.6165C9.53693 25.0426 8.52841 25.2557 7.36364 25.2557ZM21.4496 25.2557C20.1257 25.2557 18.9808 24.9744 18.0149 24.4119C17.0547 23.8437 16.3132 23.054 15.7905 22.0426C15.2678 21.0256 15.0064 19.8466 15.0064 18.5057C15.0064 17.1534 15.2678 15.9716 15.7905 14.9602C16.3132 13.9432 17.0547 13.1534 18.0149 12.5909C18.9808 12.0227 20.1257 11.7386 21.4496 11.7386C22.7734 11.7386 23.9155 12.0227 24.8757 12.5909C25.8416 13.1534 26.5859 13.9432 27.1087 14.9602C27.6314 15.9716 27.8928 17.1534 27.8928 18.5057C27.8928 19.8466 27.6314 21.0256 27.1087 22.0426C26.5859 23.054 25.8416 23.8437 24.8757 24.4119C23.9155 24.9744 22.7734 25.2557 21.4496 25.2557ZM21.4666 22.4432C22.0689 22.4432 22.5717 22.2727 22.9751 21.9318C23.3786 21.5852 23.6825 21.1136 23.8871 20.517C24.0973 19.9205 24.2024 19.2415 24.2024 18.4801C24.2024 17.7188 24.0973 17.0398 23.8871 16.4432C23.6825 15.8466 23.3786 15.375 22.9751 15.0284C22.5717 14.6818 22.0689 14.5085 21.4666 14.5085C20.8587 14.5085 20.3473 14.6818 19.9325 15.0284C19.5234 15.375 19.2138 15.8466 19.0036 16.4432C18.799 17.0398 18.6967 17.7188 18.6967 18.4801C18.6967 19.2415 18.799 19.9205 19.0036 20.517C19.2138 21.1136 19.5234 21.5852 19.9325 21.9318C20.3473 22.2727 20.8587 22.4432 21.4666 22.4432ZM35.0774 25.2131C34.0831 25.2131 33.1825 24.9574 32.3757 24.446C31.5746 23.929 30.9382 23.1705 30.4666 22.1705C30.0007 21.1648 29.7678 19.9318 29.7678 18.4716C29.7678 16.9716 30.0092 15.7244 30.4922 14.7301C30.9751 13.7301 31.6172 12.983 32.4183 12.4886C33.2251 11.9886 34.1087 11.7386 35.0689 11.7386C35.8018 11.7386 36.4126 11.8636 36.9013 12.1136C37.3956 12.358 37.7933 12.6648 38.0945 13.0341C38.4013 13.3977 38.6342 13.7557 38.7933 14.108H38.9041V7.54545H42.5263V25H38.9467V22.9034H38.7933C38.6229 23.267 38.3814 23.6278 38.0689 23.9858C37.7621 24.3381 37.3615 24.6307 36.8672 24.8636C36.3786 25.0966 35.782 25.2131 35.0774 25.2131ZM36.228 22.3239C36.8132 22.3239 37.3075 22.1648 37.7109 21.8466C38.12 21.5227 38.4325 21.071 38.6484 20.4915C38.87 19.9119 38.9808 19.233 38.9808 18.4545C38.9808 17.6761 38.8729 17 38.657 16.4261C38.4411 15.8523 38.1286 15.4091 37.7195 15.0966C37.3104 14.7841 36.8132 14.6278 36.228 14.6278C35.6314 14.6278 35.1286 14.7898 34.7195 15.1136C34.3104 15.4375 34.0007 15.8864 33.7905 16.4602C33.5803 17.0341 33.4751 17.6989 33.4751 18.4545C33.4751 19.2159 33.5803 19.8892 33.7905 20.4744C34.0064 21.054 34.3161 21.5085 34.7195 21.8381C35.1286 22.1619 35.6314 22.3239 36.228 22.3239ZM51.4773 25.2557C50.1307 25.2557 48.9716 24.983 48 24.4375C47.0341 23.8864 46.2898 23.108 45.767 22.1023C45.2443 21.0909 44.983 19.8949 44.983 18.5142C44.983 17.1676 45.2443 15.9858 45.767 14.9688C46.2898 13.9517 47.0256 13.1591 47.9744 12.5909C48.929 12.0227 50.0483 11.7386 51.3324 11.7386C52.196 11.7386 53 11.8778 53.7443 12.1562C54.4943 12.429 55.1477 12.8409 55.7045 13.392C56.267 13.9432 56.7045 14.6364 57.017 15.4716C57.3295 16.3011 57.4858 17.2727 57.4858 18.3864V19.3835H46.4318V17.1335H54.0682C54.0682 16.6108 53.9545 16.1477 53.7273 15.7443C53.5 15.3409 53.1847 15.0256 52.7812 14.7983C52.3835 14.5653 51.9205 14.4489 51.392 14.4489C50.8409 14.4489 50.3523 14.5767 49.9261 14.8324C49.5057 15.0824 49.1761 15.4205 48.9375 15.8466C48.6989 16.267 48.5767 16.7358 48.571 17.2528V19.392C48.571 20.0398 48.6903 20.5994 48.929 21.071C49.1733 21.5426 49.517 21.9062 49.9602 22.1619C50.4034 22.4176 50.929 22.5455 51.5369 22.5455C51.9403 22.5455 52.3097 22.4886 52.6449 22.375C52.9801 22.2614 53.267 22.0909 53.5057 21.8636C53.7443 21.6364 53.9261 21.358 54.0511 21.0284L57.4091 21.25C57.2386 22.0568 56.8892 22.7614 56.3608 23.3636C55.8381 23.9602 55.1619 24.4261 54.3324 24.7614C53.5085 25.0909 52.5568 25.2557 51.4773 25.2557ZM64.679 25.2131C63.6847 25.2131 62.7841 24.9574 61.9773 24.446C61.1761 23.929 60.5398 23.1705 60.0682 22.1705C59.6023 21.1648 59.3693 19.9318 59.3693 18.4716C59.3693 16.9716 59.6108 15.7244 60.0938 14.7301C60.5767 13.7301 61.2188 12.983 62.0199 12.4886C62.8267 11.9886 63.7102 11.7386 64.6705 11.7386C65.4034 11.7386 66.0142 11.8636 66.5028 12.1136C66.9972 12.358 67.3949 12.6648 67.696 13.0341C68.0028 13.3977 68.2358 13.7557 68.3949 14.108H68.5057V7.54545H72.1278V25H68.5483V22.9034H68.3949C68.2244 23.267 67.983 23.6278 67.6705 23.9858C67.3636 24.3381 66.9631 24.6307 66.4688 24.8636C65.9801 25.0966 65.3835 25.2131 64.679 25.2131ZM65.8295 22.3239C66.4148 22.3239 66.9091 22.1648 67.3125 21.8466C67.7216 21.5227 68.0341 21.071 68.25 20.4915C68.4716 19.9119 68.5824 19.233 68.5824 18.4545C68.5824 17.6761 68.4744 17 68.2585 16.4261C68.0426 15.8523 67.7301 15.4091 67.321 15.0966C66.9119 14.7841 66.4148 14.6278 65.8295 14.6278C65.233 14.6278 64.7301 14.7898 64.321 15.1136C63.9119 15.4375 63.6023 15.8864 63.392 16.4602C63.1818 17.0341 63.0767 17.6989 63.0767 18.4545C63.0767 19.2159 63.1818 19.8892 63.392 20.4744C63.608 21.054 63.9176 21.5085 64.321 21.8381C64.7301 22.1619 65.233 22.3239 65.8295 22.3239ZM78.8459 25.2472C78.0107 25.2472 77.2663 25.1023 76.6129 24.8125C75.9595 24.517 75.4425 24.0824 75.0618 23.5085C74.6868 22.929 74.4993 22.2074 74.4993 21.3438C74.4993 20.6165 74.6328 20.0057 74.8999 19.5114C75.1669 19.017 75.5305 18.6193 75.9908 18.3182C76.451 18.017 76.9737 17.7898 77.5589 17.6364C78.1499 17.483 78.7692 17.375 79.4169 17.3125C80.1783 17.233 80.7919 17.1591 81.2578 17.0909C81.7237 17.017 82.0618 16.9091 82.272 16.767C82.4822 16.625 82.5874 16.4148 82.5874 16.1364V16.0852C82.5874 15.5455 82.4169 15.1278 82.076 14.8324C81.7408 14.5369 81.2635 14.3892 80.6442 14.3892C79.9908 14.3892 79.4709 14.5341 79.0845 14.8239C78.6982 15.108 78.4425 15.4659 78.3175 15.8977L74.9595 15.625C75.13 14.8295 75.4652 14.142 75.9652 13.5625C76.4652 12.9773 77.1101 12.5284 77.8999 12.2159C78.6953 11.8977 79.6158 11.7386 80.6612 11.7386C81.3885 11.7386 82.0845 11.8239 82.7493 11.9943C83.4197 12.1648 84.0135 12.429 84.5305 12.7869C85.0533 13.1449 85.4652 13.6051 85.7663 14.1676C86.0675 14.7244 86.218 15.392 86.218 16.1705V25H82.7749V23.1847H82.6726C82.4624 23.5938 82.1811 23.9545 81.8288 24.267C81.4766 24.5739 81.0533 24.8153 80.5589 24.9915C80.0646 25.1619 79.4936 25.2472 78.8459 25.2472ZM79.8857 22.7415C80.4197 22.7415 80.8913 22.6364 81.3004 22.4261C81.7095 22.2102 82.0305 21.9205 82.2635 21.5568C82.4964 21.1932 82.6129 20.7812 82.6129 20.321V18.9318C82.4993 19.0057 82.343 19.0739 82.1442 19.1364C81.951 19.1932 81.7322 19.2472 81.4879 19.2983C81.2436 19.3437 80.9993 19.3864 80.755 19.4261C80.5107 19.4602 80.2891 19.4915 80.0902 19.5199C79.6641 19.5824 79.2919 19.6818 78.9737 19.8182C78.6555 19.9545 78.4084 20.1392 78.2322 20.3722C78.0561 20.5994 77.968 20.8835 77.968 21.2244C77.968 21.7188 78.147 22.0966 78.505 22.358C78.8686 22.6136 79.3288 22.7415 79.8857 22.7415ZM89.0348 25V11.9091H92.495V14.2188H92.6484C92.9212 13.4517 93.3757 12.8466 94.0121 12.4034C94.6484 11.9602 95.4098 11.7386 96.2962 11.7386C97.1939 11.7386 97.9581 11.9631 98.5888 12.4119C99.2195 12.8551 99.6399 13.4574 99.8501 14.2188H99.9865C100.254 13.4688 100.737 12.8693 101.435 12.4205C102.14 11.9659 102.972 11.7386 103.933 11.7386C105.154 11.7386 106.146 12.1278 106.907 12.9062C107.674 13.679 108.058 14.7756 108.058 16.196V25H104.435V16.9119C104.435 16.1847 104.242 15.6392 103.856 15.2756C103.469 14.9119 102.987 14.7301 102.407 14.7301C101.748 14.7301 101.234 14.9403 100.864 15.3608C100.495 15.7756 100.31 16.3239 100.31 17.0057V25H96.7905V16.8352C96.7905 16.1932 96.6058 15.6818 96.2365 15.3011C95.8729 14.9205 95.3928 14.7301 94.7962 14.7301C94.3928 14.7301 94.0291 14.8324 93.7053 15.0369C93.3871 15.2358 93.1342 15.517 92.9467 15.8807C92.7592 16.2386 92.6655 16.6591 92.6655 17.142V25H89.0348ZM114.556 17.4318V25H110.925V11.9091H114.386V14.2188H114.539C114.829 13.4574 115.315 12.8551 115.996 12.4119C116.678 11.9631 117.505 11.7386 118.477 11.7386C119.386 11.7386 120.178 11.9375 120.854 12.3352C121.531 12.733 122.056 13.3011 122.431 14.0398C122.806 14.7727 122.994 15.6477 122.994 16.6648V25H119.363V17.3125C119.369 16.5114 119.164 15.8864 118.749 15.4375C118.335 14.983 117.763 14.7557 117.036 14.7557C116.548 14.7557 116.116 14.8608 115.741 15.071C115.371 15.2812 115.082 15.5881 114.871 15.9915C114.667 16.3892 114.562 16.8693 114.556 17.4318Z"
        fill="#18181B"
      />
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  edit: (props: LucideProps) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.33331 1.33338H5.99998C2.66665 1.33338 1.33331 2.66671 1.33331 6.00005V10C1.33331 13.3334 2.66665 14.6667 5.99998 14.6667H9.99998C13.3333 14.6667 14.6666 13.3334 14.6666 10V8.66671M9.93998 2.76671C10.3866 4.36005 11.6333 5.60671 13.2333 6.06005M10.6933 2.01338L5.43998 7.26671C5.23998 7.46671 5.03998 7.86005 4.99998 8.14671L4.71331 10.1534C4.60665 10.88 5.11998 11.3867 5.84665 11.2867L7.85331 11C8.13331 10.96 8.52665 10.76 8.73331 10.56L13.9866 5.30671C14.8933 4.40005 15.32 3.34671 13.9866 2.01338C12.6533 0.680046 11.6 1.10671 10.6933 2.01338Z"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  experience: Sparkle,
  thunderbolt: Zap,
  trophy: Trophy,
  karma: HeartPulse,
  search: Search,
  notification: Bell,
  user: User,
  about: Info,
  logout: LogOut,
  chrome: Chrome,
  spinner: Loader2,
  cross: X,
};
