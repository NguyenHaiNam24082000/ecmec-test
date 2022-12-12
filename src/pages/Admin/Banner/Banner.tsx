import { deleteBanner, getBanner, postBanner, putBanner } from '@apis/bannerApi';
import { postIntroductionDetail } from '@apis/introductionApi';
import Banner from '@components/Banner/Banner';
import configs from '@constants/configs';
import { bannerType } from '@constants/types';
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
  ActionIcon,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import RichTextEditor from '@mantine/rte';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { getAboutApi } from 'redux/reducer/about.slice';

const MAX_FILE_LENGTH = 10;

const labels = {
  tagLineVn: 'Tiêu đề',
  tagLineEn: 'Title',
  descriptionVn: 'Mô tả',
  descriptionEn: 'Description',
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
  const [files, setFiles] = useState<File[]>([]);
  const [bannerObj, setBannerObj] = useState<bannerType | null>(null);
  const [openedModalAddInfo, setOpenedModalAddInfo] = useState(false);
  const [openedModalInfo, setOpenedModalInfo] = useState({
    index: 0,
    isOpen: false,
  });

  const [openedModalEditInfo, setOpenedModalEditInfo] = useState(false);

  const form = useForm({
    initialValues: {
      tagLineVn: '',
      tagLineEn: '',
      descriptionVn: '',
      descriptionEn: '',
      createdTime: Date.now(),
      createdUser: 'admin',
      modifiedTime: Date.now(),
      modifiedUser: 'admin',
      images: [],
    },

    validate: {
      tagLineVn: (value) => (value.length ? null : `${labels.tagLineVn} bắt buộc phải nhập`),
      tagLineEn: (value) => (value.length ? null : `${labels.tagLineEn} bắt buộc phải nhập`),
      descriptionVn: (value) =>
        value.length ? null : `${labels.descriptionVn} bắt buộc phải nhập`,
      descriptionEn: (value) =>
        value.length ? null : `${labels.descriptionEn} bắt buộc phải nhập`,
    },
  });
  const isVietTabEmpty = form?.values?.tagLineVn?.length && form?.values?.descriptionVn?.length;
  const isEnglishTabEmpty = form?.values?.tagLineEn?.length && form?.values?.descriptionEn?.length;
  const [images, setImages] = useState<any>([]);
  // const images: any = [];
  const getBannerApi = () => {
    getBanner().then((res: any) => {
      const obj = res.data;
      setBannerObj(obj);
    });
  };
  useEffect(() => {
    getBannerApi();
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
        disabled={!!bannerObj?.id}
        onClick={() => {
          setOpenedModalAddInfo(true);
        }}
      >
        Tạo mới
      </Button>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>{labels.tagLineVn}</th>
            <th>{labels.descriptionVn}</th>
            <th style={{ width: 320 }}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {bannerObj?.id && (
            <tr>
              <td>
                <Anchor
                  onClick={() => {
                    setOpenedModalInfo({
                      index: 0,
                      isOpen: true,
                    });
                  }}
                >
                  {bannerObj?.tagLineVn}
                </Anchor>
              </td>
              <td>{bannerObj?.descriptionVn}</td>
              <td>
                <Group grow>
                  <Button
                    onClick={() => {
                      setOpenedModalInfo({
                        index: 0,
                        isOpen: true,
                      });
                    }}
                  >
                    Xem
                  </Button>
                  <Button
                    onClick={() => {
                      form.setValues(bannerObj as any);
                      setImages(bannerObj.images);
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
                          deleteBanner(bannerObj?.id).then(() => {
                            getBannerApi();
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
          )}
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
        <Banner />
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
            const listImages = [
              ...files.map(() => ({
                createdTime: Date.now(),
                createdUser: 'admin',
                modifiedTime: Date.now(),
                modifiedUser: 'admin',
              })),
            ];
            data.append(
              'bannervo',
              new Blob([JSON.stringify({ ...values, images: listImages })], {
                type: 'application/json',
              }),
            );
            postBanner(data);
            getBannerApi();
            setOpenedModalAddInfo(false);
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
                placeholder={labels.tagLineVn}
                label={labels.tagLineVn}
                withAsterisk
                required
                {...form.getInputProps('tagLineVn')}
              />
              <Input.Wrapper id="contentVn" required label={labels.descriptionVn}>
                <Textarea
                  id="contentVn"
                  required
                  placeholder={labels.descriptionVn}
                  {...form.getInputProps('descriptionVn')}
                  minRows={2}
                  maxRows={4}
                />
              </Input.Wrapper>
            </Tabs.Panel>

            <Tabs.Panel value="english" pt="xs">
              <TextInput
                placeholder={labels.tagLineEn}
                label={labels.tagLineEn}
                withAsterisk
                required
                {...form.getInputProps('tagLineEn')}
              />
              <Input.Wrapper id="contentEn" required label={labels.descriptionEn}>
                <Textarea
                  id="contentEn"
                  required
                  placeholder={labels.descriptionEn}
                  {...form.getInputProps('descriptionEn')}
                  minRows={2}
                  maxRows={4}
                />
              </Input.Wrapper>
            </Tabs.Panel>
          </Tabs>
          <Input.Wrapper
            required
            label={labels.image}
            description={`Số hình ảnh tối đa là ${MAX_FILE_LENGTH}`}
          >
            <Group mt={6}>
              {files.length < MAX_FILE_LENGTH && (
                <FileButton
                  onChange={(payload: any) =>
                    setFiles((prev) => [
                      ...prev,
                      ...payload.slice(0, MAX_FILE_LENGTH - prev.length),
                    ])
                  }
                  accept="image/*"
                  multiple
                >
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
                  src={configs.BASE_IMAGE_URL + file?.url}
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
            data.append(
              'file',
              new Blob(undefined, {
                type: 'multipart/form-data',
              }),
            );
            data.append(
              'bannervo',
              new Blob([JSON.stringify({ ...values })], {
                type: 'application/json',
              }),
            );
            putBanner(data).then(() => {
              showNotification({
                title: 'Thành công',
                message: 'Chỉnh sửa thành công',
                color: 'green',
                autoClose: 5000,
              });
              getBannerApi();
              form.setValues({
                tagLineVn: '',
                tagLineEn: '',
                descriptionVn: '',
                descriptionEn: '',
                createdTime: Date.now(),
                createdUser: 'admin',
                modifiedTime: Date.now(),
                modifiedUser: 'admin',
                images: [],
              });
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
                placeholder={labels.tagLineVn}
                label={labels.tagLineVn}
                withAsterisk
                required
                {...form.getInputProps('tagLineVn')}
              />
              <Input.Wrapper id="contentVn" required label={labels.descriptionVn}>
                <Textarea
                  id="contentEn"
                  required
                  placeholder={labels.descriptionVn}
                  {...form.getInputProps('descriptionVn')}
                  minRows={2}
                  maxRows={4}
                />
              </Input.Wrapper>
            </Tabs.Panel>

            <Tabs.Panel value="english" pt="xs">
              <TextInput
                placeholder={labels.tagLineEn}
                label={labels.tagLineEn}
                withAsterisk
                required
                {...form.getInputProps('tagLineEn')}
              />
              <Input.Wrapper id="contentEn" required label={labels.descriptionEn}>
                <Textarea
                  id="contentEn"
                  required
                  placeholder={labels.descriptionEn}
                  {...form.getInputProps('descriptionEn')}
                  minRows={2}
                  maxRows={4}
                />
              </Input.Wrapper>
            </Tabs.Panel>
          </Tabs>
          <Input.Wrapper
            required
            label={labels.image}
            description={`Số hình ảnh tối đa là ${MAX_FILE_LENGTH}`}
          >
            <Group mt={6}>
              {files.length < MAX_FILE_LENGTH && (
                <FileButton
                  onChange={(payload: any) =>
                    setFiles((prev) => [
                      ...prev,
                      ...payload.slice(0, MAX_FILE_LENGTH - prev.length),
                    ])
                  }
                  accept="image/*"
                  multiple
                >
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
