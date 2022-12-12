import { deletePartner, postPartner, putPartner } from '@apis/partnerApi';
import configs from '@constants/configs';
import { Carousel } from '@mantine/carousel';
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
  Flex,
  ActionIcon,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import RichTextEditor from '@mantine/rte';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getAboutApi } from 'redux/reducer/about.slice';
import { getPartnerApi } from 'redux/reducer/partner.slice';

const MAX_FILE_LENGTH = 1;

const labels = {
  nameVn: 'Tên đối tác',
  nameEn: 'Name',
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

function About() {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<File[]>([]);
  const partners = useAppSelector((state) => state.partner.partner);
  const [openedModalAddInfo, setOpenedModalAddInfo] = useState(false);
  const [openedModalInfo, setOpenedModalInfo] = useState({
    index: 0,
    isOpen: false,
  });
  const [openedModalEditInfo, setOpenedModalEditInfo] = useState(false);

  const form = useForm({
    initialValues: {
      nameVn: '',
      nameEn: '',
      isShow: true,
      priority: partners?.length || 0,
      createdTime: Date.now(),
      createdUser: 'admin',
      modifiedTime: Date.now(),
      modifiedUser: 'admin',
      image: [],
    },

    validate: {},
  });
  const [images, setImages] = useState<any>([]);
  // const images: any = [];
  const getPartner = () => {
    dispatch(getPartnerApi());
  };

  useEffect(() => {
    form.setValues({ priority: partners.length });
  }, [partners]);

  useEffect(() => {
    getPartner();
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
      setImages(res);
    });
  }, [files]);
  return (
    <Paper shadow="xs" p="md">
      <Button
        onClick={() => {
          form.setValues({
            nameVn: '',
            nameEn: '',
            isShow: true,
            priority: partners?.length || 0,
            createdTime: Date.now(),
            createdUser: 'admin',
            modifiedTime: Date.now(),
            modifiedUser: 'admin',
            image: [],
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
            <th style={{ width: '20%' }}>{labels.image}</th>
            <th style={{ width: 100 }}>Độ ưu tiên</th>
            <th style={{ width: 320 }}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {!!partners?.length &&
            partners.map((partner, index, arr) => (
              <tr key={partner.id}>
                <td>
                  <Switch
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    checked={partner.isShow}
                    onClick={(event: any) => {
                      const data = new FormData();
                      data.append(
                        'file',
                        new Blob(undefined, {
                          type: 'multipart/form-data',
                        }),
                      );
                      data.append(
                        'partnervo',
                        new Blob([JSON.stringify({ ...partner, isShow: event.target.checked })], {
                          type: 'application/json',
                        }),
                      );
                      putPartner(data).then(() => {
                        getPartner();
                      });
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
                    {partner.nameVn}
                  </Anchor>
                </td>
                <td>
                  <Image src={configs.BASE_IMAGE_URL + partner?.image[0]?.url} withPlaceholder />
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
                          'partnervo',
                          new Blob(
                            [
                              JSON.stringify({
                                ...partner,
                                priority: index > 1 ? arr.at(index - 1)!.priority - 1 : 0,
                              }),
                            ],
                            {
                              type: 'application/json',
                            },
                          ),
                        );
                        putPartner(data).then(() => {
                          getPartner();
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
                          'partnervo',
                          new Blob(
                            [
                              JSON.stringify({
                                ...partner,
                                priority: index < arr.length ? arr.at(index + 1)!.priority + 1 : arr.length,
                              }),
                            ],
                            {
                              type: 'application/json',
                            },
                          ),
                        );
                        putPartner(data).then(() => {
                          getPartner();
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
                        form.setValues(partner as any);
                        setImages(partner.image);
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
                          onCancel: () => {},
                          onConfirm: () => {
                            deletePartner(partner.id).then(() => {
                              getPartner();
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

        <Image
          withPlaceholder
          src={configs.BASE_IMAGE_URL + partners.at(openedModalInfo.index)?.image.at(0)?.url}
          sx={{
            '@media (max-width: 1400px)': {
              img: { height: '92px !important' },
            },
            '@media (max-width: 600px)': {
              img: { height: '47px !important' },
            },
          }}
          height={112}
          width="auto"
          title={
            i18next.language === 'vi_VN'
              ? partners.at(openedModalInfo.index)?.nameVn
              : partners.at(openedModalInfo.index)?.nameEn
          }
          alt={
            i18next.language === 'vi_VN'
              ? partners.at(openedModalInfo.index)?.nameVn
              : partners.at(openedModalInfo.index)?.nameEn
          }
        />
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
            if (images.length == 0)
              data.append(
                'file',
                new Blob(undefined, {
                  type: 'multipart/form-data',
                }),
              );
            const listImages = [
              {
                createdTime: Date.now(),
                createdUser: 'admin',
                modifiedTime: Date.now(),
                modifiedUser: 'admin',
              },
            ];
            data.append(
              'partnervo',
              new Blob([JSON.stringify({ ...values, image: listImages })], {
                type: 'application/json',
              }),
            );
            postPartner(data).then(() => {
              showNotification({
                title: 'Thành công',
                message: 'Thêm mới thành công',
                color: 'green',
                autoClose: 5000,
              });
              getPartner();
              setFiles([]);
              setOpenedModalAddInfo(false);
            });
          })}
        >
          <Tabs defaultValue="viet">
            <Tabs.List grow>
              <Tabs.Tab value="viet">Tiếng Việt</Tabs.Tab>
              <Tabs.Tab value="english">English</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="viet" pt="xs">
              <TextInput
                placeholder={labels.nameVn}
                label={labels.nameVn}
                withAsterisk
                {...form.getInputProps('nameVn')}
              />
            </Tabs.Panel>

            <Tabs.Panel value="english" pt="xs">
              <TextInput
                placeholder={labels.nameEn}
                label={labels.nameEn}
                withAsterisk
                {...form.getInputProps('nameEn')}
              />
            </Tabs.Panel>
          </Tabs>
          <Input.Wrapper
            required
            label={labels.image}
            description={`Số hình ảnh tối đa là ${MAX_FILE_LENGTH}`}
          >
            <Group mt={6}>
              {files.length < MAX_FILE_LENGTH && (
                <FileButton onChange={(payload: any) => setFiles([payload])} accept="image/*">
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
              )}
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
                'partnervo',
                new Blob([JSON.stringify({ ...values, image: listImages })], {
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
              data.append(
                'partnervo',
                new Blob([JSON.stringify({ ...values })], {
                  type: 'application/json',
                }),
              );
            }
            putPartner(data).then(() => {
              showNotification({
                title: 'Thành công',
                message: 'Cập nhật thành công',
                color: 'green',
                autoClose: 5000,
              });
              getPartner();
              setFiles([]);
              setOpenedModalEditInfo(false);
            });
          })}
        >
          <Tabs defaultValue="viet">
            <Tabs.List grow>
              <Tabs.Tab value="viet">Tiếng Việt</Tabs.Tab>
              <Tabs.Tab value="english">English</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="viet" pt="xs">
              <TextInput
                placeholder={labels.nameVn}
                label={labels.nameVn}
                withAsterisk
                {...form.getInputProps('nameVn')}
              />
            </Tabs.Panel>

            <Tabs.Panel value="english" pt="xs">
              <TextInput
                placeholder={labels.nameEn}
                label={labels.nameEn}
                withAsterisk
                {...form.getInputProps('nameEn')}
              />
            </Tabs.Panel>
          </Tabs>
          <Input.Wrapper
            required
            label={labels.image}
            description={`Số hình ảnh tối đa là ${MAX_FILE_LENGTH}`}
          >
            <Group mt={6}>
              {files.length < MAX_FILE_LENGTH && (
                <FileButton onChange={(payload: any) => setFiles([payload])} accept="image/*">
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
              )}
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

export default About;
