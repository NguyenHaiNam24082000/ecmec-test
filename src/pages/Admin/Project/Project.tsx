import { deleteProjectDetail, postProjectDetail, putProjectDetail } from '@apis/projectApi';
import {
  Button,
  Divider,
  Group,
  Modal,
  NumberInput,
  Paper,
  Table,
  Tabs,
  Text,
  TextInput,
  TypographyStylesProvider,
  Input,
  Switch,
  Anchor,
  Image,
  FileButton,
  Box,
  Badge,
  ActionIcon,
  Select,
  MultiSelect,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import RichTextEditor from '@mantine/rte';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getProjectApi } from 'redux/reducer/projects.slice';
import { getServiceApi } from 'redux/reducer/service.slice';
import 'dayjs/locale/vi';
import { showNotification } from '@mantine/notifications';
import { openConfirmModal } from '@mantine/modals';
import configs from '@constants/configs';

const MAX_FILE_LENGTH = Infinity;

const statuses = [
  {
    status: 'Đang tiến hành',
    color: 'yellow',
  },
  {
    status: 'Hoàn thành',
    color: 'green',
  },
  { status: 'Thất bại', color: 'red' },
];

const labels = {
  nameVn: 'Tên',
  nameEn: 'Title',
  contentVn: 'Mô tả',
  contentEn: 'Description',
  addressVn: 'Địa chỉ',
  addressEn: 'Address',
  area: 'Diện tích',
  duration: 'Thời gian',
  investor: 'Nhà đầu tư',
  start: 'Thời gian bắt đầu',
  mainContractor: 'Nhà thầu chính',
  service: 'Dịch vụ',
  status: 'Trạng thái',
  image: 'Ảnh',
};

const handleFileChosen = async (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function Project() {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const listProject = useAppSelector((state) => state.projects.project);
  const listService = useAppSelector((state) => state.service.service);
  const [openedModalAddInfo, setOpenedModalAddInfo] = useState(false);
  const [openedModalInfo, setOpenedModalInfo] = useState({
    index: 0,
    isOpen: false,
  });
  const [openedModalEditInfo, setOpenedModalEditInfo] = useState(false);
  const form = useForm({
    initialValues: {
      status: 0,
      nameVn: '',
      nameEn: '',
      contentVn: '',
      contentEn: '',
      addressVn: '',
      addressEn: '',
      area: undefined,
      duration: undefined,
      investor: '',
      start: '',
      mainContractor: '',
      priority: listProject.length || 0,
      isShow: true,
      createdTime: Date.now(),
      createdUser: 'admin',
      modifiedTime: Date.now(),
      modifiedUser: 'admin',
      isDeleted: false,
      services: [],
      images: [],
    },

    validate: {
      nameVn: (value) => (value.length ? null : `${labels.nameVn} bắt buộc phải nhập`),
      nameEn: (value) => (value.length ? null : `${labels.nameEn} bắt buộc phải nhập`),
      contentVn: (value) => (value.length ? null : `${labels.contentVn} bắt buộc phải nhập`),
      contentEn: (value) => (value.length ? null : `${labels.contentEn} bắt buộc phải nhập`),
    },
  });
  const isVietTabEmpty =
    form?.values?.nameVn?.length &&
    form?.values?.addressVn?.length &&
    form?.values?.contentVn?.length;
  const isEnglishTabEmpty =
    form?.values?.nameEn?.length &&
    form?.values?.addressEn?.length &&
    form?.values?.contentEn?.length;
  const [images, setImages] = useState<any>([]);
  // const images: any = [];
  const getProject = () => {
    dispatch(getProjectApi());
  };
  const getService = () => {
    dispatch(getServiceApi());
  };
  useEffect(() => {
    getService();
    getProject();
  }, []);
  useEffect(() => {
    Promise.all(
      files.map((file) =>
        handleFileChosen(file).then((res) => ({
          name: file.name,
          url: res,
          type: file.type,
        })),
      ),
    ).then((res) => {
      console.log(res);
      setImages(res);
    });
  }, [files]);

  useEffect(() => {
    form.setValues({ priority: listProject.length });
  }, [listProject]);
  return (
    <Paper shadow="xs" p="md">
      <Button
        onClick={() => {
          form.setValues({
            status: 0,
            nameVn: '',
            nameEn: '',
            contentVn: '',
            contentEn: '',
            addressVn: '',
            addressEn: '',
            area: undefined,
            duration: undefined,
            investor: '',
            start: '',
            mainContractor: '',
            priority: listProject.length || 0,
            isShow: true,
            createdTime: Date.now(),
            createdUser: 'admin',
            modifiedTime: Date.now(),
            modifiedUser: 'admin',
            isDeleted: false,
            services: [],
            images: [],
          });
          setFiles([]);
          setOpenedModalAddInfo(true);
        }}
      >
        Tạo mới
      </Button>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th style={{ width: 40 }}>Hiển thị</th>
            <th>{labels.nameVn}</th>
            <th>{labels.status}</th>
            <th>{labels.image}</th>
            <th style={{ width: 80 }}>Độ ưu tiên</th>
            <th style={{ width: 320 }}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {!!listProject?.length &&
            listProject.map((project, index, arr) => (
              <tr key={project.id}>
                <td>
                  <Switch
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </td>
                <td>
                  <Anchor
                    onClick={() => {
                      setOpenedModalInfo({
                        index,
                        isOpen: true,
                      });
                    }}
                  >
                    {project.nameVn}
                  </Anchor>
                </td>
                <td>
                  <Badge
                    color={
                      statuses?.[
                        ['in progress', 'completed', 'failed'].findIndex((status) =>
                          status.includes(project?.status),
                        )
                      ]?.color
                    }
                    variant="filled"
                  >
                    {
                      statuses[
                        ['in progress', 'completed', 'failed'].findIndex((status) =>
                          status.includes(project?.status),
                        )
                      ].status
                    }
                  </Badge>
                </td>
                <td>
                  <Image
                    src={`${configs.BASE_IMAGE_URL}${project?.images[0]?.url}`}
                    withPlaceholder
                  />
                </td>
                <td>
                  <Group>
                    <ActionIcon
                      onClick={() => {
                        const data = new FormData();
                        data.append(
                          'file',
                          new Blob(undefined, {
                            type: 'multipart/form-data',
                          }),
                        );
                        data.append(
                          'projectvo',
                          new Blob(
                            [
                              JSON.stringify({
                                ...project,
                                priority: index > 1 ? arr.at(index - 1)!.priority! - 1 : 0,
                              }),
                            ],
                            {
                              type: 'application/json',
                            },
                          ),
                        );
                        putProjectDetail(data).then(() => {
                          getProject();
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-arrow-up"
                        width={44}
                        height={44}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1={12} y1={5} x2={12} y2={19} />
                        <line x1={18} y1={11} x2={12} y2={5} />
                        <line x1={6} y1={11} x2={12} y2={5} />
                      </svg>
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => {
                        const data = new FormData();
                        data.append(
                          'file',
                          new Blob(undefined, {
                            type: 'multipart/form-data',
                          }),
                        );
                        data.append(
                          'projectvo',
                          new Blob(
                            [
                              JSON.stringify({
                                ...project,
                                priority: index < arr.length ? arr.at(index + 1)!.priority! + 1 : arr.length,
                              }),
                            ],
                            {
                              type: 'application/json',
                            },
                          ),
                        );
                        putProjectDetail(data).then(() => {
                          getProject();
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-arrow-down"
                        width={44}
                        height={44}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1={12} y1={5} x2={12} y2={19} />
                        <line x1={18} y1={13} x2={12} y2={19} />
                        <line x1={6} y1={13} x2={12} y2={19} />
                      </svg>
                    </ActionIcon>
                  </Group>
                </td>
                <td>
                  <Group grow>
                    <Button
                      onClick={() => {
                        setOpenedModalInfo({
                          index,
                          isOpen: true,
                        });
                      }}
                    >
                      Xem
                    </Button>
                    <Button
                      onClick={() => {
                        // eslint-disable-next-line
                        form.setValues({ ...project, status: project.status === 'in progress' ? 0 : 1, services: [...project.services.map((service) => service.id) as number[]] });
                        setImages(project.images);
                        setFiles([]);
                        setOpenedModalEditInfo(true);
                      }}
                    >
                      Sửa
                    </Button>
                    <Button
                      onClick={() => {
                        openConfirmModal({
                          title: 'Tiếp tục',
                          children: <Text size="sm">Bạn có muốn xoá không?</Text>,
                          labels: { confirm: 'Xoá', cancel: 'Huỷ bỏ' },
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          onCancel: () => { },
                          onConfirm: () => {
                            deleteProjectDetail(project.id).then(() => {
                              getProject();
                              showNotification({
                                title: 'Thành công',
                                message: 'Xoá thành công',
                                color: 'green',
                                autoClose: 5000,
                              });
                            });
                          },
                        });
                      }}
                    >
                      Xoá
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal
        opened={openedModalInfo.isOpen}
        onClose={() => {
          setOpenedModalInfo({
            index: 0,
            isOpen: false,
          });
        }}
        size="100%"
        title="Thông tin chi tiết"
      >
        <Table>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <TypographyStylesProvider>
          <div
            dangerouslySetInnerHTML={{
              __html: listProject?.at(openedModalInfo.index)?.contentVn || '',
            }}
          />
        </TypographyStylesProvider>
      </Modal>
      <Modal
        opened={openedModalAddInfo}
        onClose={() => {
          setOpenedModalAddInfo(false);
        }}
        size="100%"
        title="Thêm mới"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            const data = new FormData();
            images.forEach((image: any) => {
              const base64 = image.url.split(';base64,');
              const byteCharacters = atob(base64[1]);
              const byteNumbers = new Array(byteCharacters.length);
              for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
              }
              const byteArray = new Uint8Array(byteNumbers);
              data.append('file', new Blob([byteArray], { type: image.type }), image.name);
            });
            if (images.length === 0)
              data.append(
                'file',
                new Blob(undefined, {
                  type: 'multipart/form-data',
                }),
              );
            const listImages = [
              ...files.map(() => ({
                createdTime: Date.now(),
                createdUser: 'admin',
                modifiedTime: Date.now(),
                modifiedUser: 'admin',
              })),
            ];
            const listServices = [
              ...values.services.map((service: any) => ({
                ...listService.find((s) => service === s.id),
                projects:
                {
                  ...values
                }
              }))
            ];
            data.append(
              'projectvo',
              new Blob([JSON.stringify({ ...values, images: listImages, services: listServices })], {
                type: 'application/json',
              }),
            );
            postProjectDetail(data).then(() => {
              showNotification({
                title: 'Thành công',
                message: 'Thêm mới thành công',
                color: 'green',
                autoClose: 5000,
              });
              getProject();
              setOpenedModalAddInfo(false);
            });
          })}
        >
          <Tabs defaultValue="viet">
            <Tabs.List grow>
              <Tabs.Tab value="viet" rightSection={!isVietTabEmpty && <Text c="red"> *</Text>}>
                Tiếng Việt
              </Tabs.Tab>
              <Tabs.Tab
                value="english"
                rightSection={!isEnglishTabEmpty && <Text c="red"> *</Text>}
              >
                English
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="viet" pt="xs">
              <TextInput
                placeholder={labels.nameVn}
                label={labels.nameVn}
                withAsterisk
                required
                {...form.getInputProps('nameVn')}
              />
              <TextInput
                placeholder={labels.addressVn}
                label={labels.addressVn}
                withAsterisk
                required
                {...form.getInputProps('addressVn')}
              />
              <Input.Wrapper id="contentVn" required label={labels.contentVn}>
                <RichTextEditor
                  sticky={false}
                  id="contentVn"
                  required
                  controls={[
                    ['bold', 'italic', 'underline'],
                    ['h1', 'h2', 'h3', 'h4'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ['unorderedList', 'orderedList'],
                    ['sup', 'sub'],
                    ['link', 'clean'],
                  ]}
                  placeholder={labels.contentVn}
                  label={labels.contentVn}
                  {...form.getInputProps('contentVn')}
                />
              </Input.Wrapper>
            </Tabs.Panel>

            <Tabs.Panel value="english" pt="xs">
              <TextInput
                placeholder={labels.nameEn}
                label={labels.nameEn}
                withAsterisk
                required
                {...form.getInputProps('nameEn')}
              />
              <TextInput
                placeholder={labels.addressEn}
                label={labels.addressEn}
                withAsterisk
                required
                {...form.getInputProps('addressEn')}
              />
              <Input.Wrapper id="contentEn" required label={labels.contentEn}>
                <RichTextEditor
                  sticky={false}
                  id="contentEn"
                  required
                  controls={[
                    ['bold', 'italic', 'underline'],
                    ['h1', 'h2', 'h3', 'h4'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ['unorderedList', 'orderedList'],
                    ['sup', 'sub'],
                    ['link', 'clean'],
                  ]}
                  placeholder={labels.contentEn}
                  label={labels.contentEn}
                  {...form.getInputProps('contentEn')}
                />
              </Input.Wrapper>
            </Tabs.Panel>
          </Tabs>
          <Select
            placeholder={labels.status}
            label={labels.status}
            withAsterisk
            required
            {...form.getInputProps('status')}
            data={[
              { value: 0, label: 'Đang xử lý' },
              { value: 1, label: 'Hoàn thành' },
            ]}
          />
          <NumberInput
            placeholder={labels.area}
            label={labels.area}
            withAsterisk
            required
            hideControls
            {...form.getInputProps('area')}
          />
          <Group grow>
            <DatePicker
              placeholder="Pick date"
              label="Event date"
              withAsterisk
              locale="vi"
              {...form.getInputProps('start')}
            />
          </Group>
          <NumberInput
            placeholder={labels.duration}
            label={labels.duration}
            withAsterisk
            required
            hideControls
            {...form.getInputProps('duration')}
          />
          <TextInput
            placeholder={labels.investor}
            label={labels.investor}
            withAsterisk
            required
            {...form.getInputProps('investor')}
          />
          <TextInput
            placeholder={labels.mainContractor}
            label={labels.mainContractor}
            withAsterisk
            required
            {...form.getInputProps('mainContractor')}
          />
          <MultiSelect
            data={[
              ...listService.map((service) => ({
                value: service.id,
                label: service.nameVn,
              })),
            ]}
            placeholder={labels.service}
            label={labels.service}
            withAsterisk
            required
            {...form.getInputProps('services')}
          />
          <Input.Wrapper
            required
            label={labels.image}
            description={`Số hình ảnh tối đa là ${MAX_FILE_LENGTH}`}
          >
            <Group mt={6}>
              <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
                {(props) => (
                  <Box
                    {...props}
                    sx={{
                      width: 100,
                      height: 100,
                      border: '3px dashed black',
                      borderRadius: 6,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      height={48}
                      width={48}
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="StyledIconBase-ea9ulj-0 bWRyML"
                    >
                      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                    </svg>
                  </Box>
                )}
              </FileButton>
              {images.map((file: any, index: any) => (
                <Image
                  key={index}
                  width={100}
                  height={100}
                  radius={6}
                  withPlaceholder
                  src={files.length ? file?.url : configs.BASE_IMAGE_URL + file?.url}
                ></Image>
              ))}
            </Group>
          </Input.Wrapper>
          <Divider mt="xs" />
          <Group position="right" mt="xs">
            <Button
              variant="default"
              onClick={() => {
                setOpenedModalAddInfo(false);
              }}
            >
              Huỷ bỏ
            </Button>
            <Button type="submit">Thêm mới</Button>
          </Group>
        </form>
      </Modal>
      <Modal
        opened={openedModalEditInfo}
        onClose={() => {
          setOpenedModalEditInfo(false);
        }}
        size="100%"
        title="Chỉnh sửa"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            const data = new FormData();
            if (files.length) {
              images.forEach((image: any) => {
                const base64 = image.url.split(';base64,');
                const byteCharacters = atob(base64[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                data.append('file', new Blob([byteArray], { type: image.type }), image.name);
              });
              const listImages = [
                ...files.map(() => ({
                  url: '',
                  createdTime: Date.now(),
                  createdUser: 'admin',
                  modifiedTime: Date.now(),
                  modifiedUser: 'admin',
                })),
              ];
              data.append(
                'projectvo',
                new Blob([JSON.stringify({ ...values, images: listImages })], {
                  type: 'application/json',
                }),
              );
            } else {
              data.append(
                'file',
                new Blob(undefined, {
                  type: 'multipart/form-data',
                }),
              );
              const listServices = [
                ...values.services.map((service: any) => ({
                  ...listService.find((s) => service === s.id),
                  // projects:
                  // {
                  //   ...values
                  // }
                }))
              ];
              console.log(listServices);
              data.append(
                'projectvo',
                new Blob([JSON.stringify({ ...values, services: listServices })], {
                  type: 'application/json',
                }),
              );
            }
            putProjectDetail(data).then(() => {
              showNotification({
                title: 'Thành công',
                message: 'Chỉnh sửa thành công',
                color: 'green',
                autoClose: 5000,
              });
              getProject();
              setOpenedModalEditInfo(false);
            });
          })}
        >
          <Tabs defaultValue="viet">
            <Tabs.List grow>
              <Tabs.Tab value="viet" rightSection={!isVietTabEmpty && <Text c="red"> *</Text>}>
                Tiếng Việt
              </Tabs.Tab>
              <Tabs.Tab
                value="english"
                rightSection={!isEnglishTabEmpty && <Text c="red"> *</Text>}
              >
                English
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="viet" pt="xs">
              <TextInput
                placeholder={labels.nameVn}
                label={labels.nameVn}
                withAsterisk
                required
                {...form.getInputProps('nameVn')}
              />
              <TextInput
                placeholder={labels.addressVn}
                label={labels.addressVn}
                withAsterisk
                required
                {...form.getInputProps('addressVn')}
              />
              <Input.Wrapper id="contentVn" required label={labels.contentVn}>
                <RichTextEditor
                  sticky={false}
                  id="contentVn"
                  required
                  controls={[
                    ['bold', 'italic', 'underline'],
                    ['h1', 'h2', 'h3', 'h4'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ['unorderedList', 'orderedList'],
                    ['sup', 'sub'],
                    ['link', 'clean'],
                  ]}
                  placeholder={labels.contentVn}
                  label={labels.contentVn}
                  {...form.getInputProps('contentVn')}
                />
              </Input.Wrapper>
            </Tabs.Panel>

            <Tabs.Panel value="english" pt="xs">
              <TextInput
                placeholder={labels.nameEn}
                label={labels.nameEn}
                withAsterisk
                required
                {...form.getInputProps('nameEn')}
              />
              <TextInput
                placeholder={labels.addressEn}
                label={labels.addressEn}
                withAsterisk
                required
                {...form.getInputProps('addressEn')}
              />
              <Input.Wrapper id="contentEn" required label={labels.contentEn}>
                <RichTextEditor
                  sticky={false}
                  id="contentEn"
                  required
                  controls={[
                    ['bold', 'italic', 'underline'],
                    ['h1', 'h2', 'h3', 'h4'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ['unorderedList', 'orderedList'],
                    ['sup', 'sub'],
                    ['link', 'clean'],
                  ]}
                  placeholder={labels.contentEn}
                  label={labels.contentEn}
                  {...form.getInputProps('contentEn')}
                />
              </Input.Wrapper>
            </Tabs.Panel>
          </Tabs>
          <Select
            placeholder={labels.status}
            label={labels.status}
            withAsterisk
            required
            data={[
              { value: 0, label: 'Đang xử lý' },
              { value: 1, label: 'Hoàn thành' },
            ]}
            {...form.getInputProps('status')}
          />
          <NumberInput
            placeholder={labels.area}
            label={labels.area}
            withAsterisk
            required
            hideControls
            {...form.getInputProps('area')}
          />
          <Group grow>
            <DatePicker
              placeholder="Pick date"
              label="Event date"
              withAsterisk
              locale="vi"
              {...form.getInputProps('start')}
              value={new Date(form.getInputProps('start').value)}
            />
          </Group>
          <NumberInput
            placeholder={labels.duration}
            label={labels.duration}
            withAsterisk
            required
            hideControls
            {...form.getInputProps('duration')}
          />
          <TextInput
            placeholder={labels.investor}
            label={labels.investor}
            withAsterisk
            required
            {...form.getInputProps('investor')}
          />
          <TextInput
            placeholder={labels.mainContractor}
            label={labels.mainContractor}
            withAsterisk
            required
            {...form.getInputProps('mainContractor')}
          />
          <MultiSelect
            data={[
              ...listService.map((service) => ({
                value: service.id,
                label: service.nameVn
              })),
            ]}
            placeholder={labels.service}
            label={labels.service}
            withAsterisk
            required
            {...form.getInputProps('services')}
          />
          <Input.Wrapper
            required
            label={labels.image}
            description={`Số hình ảnh tối đa là ${MAX_FILE_LENGTH}`}
          >
            <Group mt={6}>
              <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
                {(props) => (
                  <Box
                    {...props}
                    sx={{
                      width: 100,
                      height: 100,
                      border: '3px dashed black',
                      borderRadius: 6,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      height={48}
                      width={48}
                      aria-hidden="true"
                      focusable="false"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="StyledIconBase-ea9ulj-0 bWRyML"
                    >
                      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
                    </svg>
                  </Box>
                )}
              </FileButton>
              {images.map((file: any, index: any) => (
                <Image
                  key={index}
                  width={100}
                  height={100}
                  radius={6}
                  withPlaceholder
                  src={files.length ? file?.url : configs.BASE_IMAGE_URL + file?.url}
                ></Image>
              ))}
            </Group>
          </Input.Wrapper>
          <Divider mt="xs" />
          <Group position="right" mt="xs">
            <Button
              variant="default"
              onClick={() => {
                setOpenedModalEditInfo(false);
              }}
            >
              Huỷ bỏ
            </Button>
            <Button type="submit">Chỉnh sửa</Button>
          </Group>
        </form>
      </Modal>
    </Paper>
  );
}

export default Project;
