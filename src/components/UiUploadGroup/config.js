export default {
  // 创意类型
  TABS: {
    CREATIVE_IMAGE_MODE_LARGE: '大图横图',
    CREATIVE_IMAGE_MODE_VIDEO: '横版视频',
    CREATIVE_IMAGE_MODE_VIDEO_VERTICAL: '竖版视频',
    CREATIVE_IMAGE_MODE_GROUP: '组图',
    CREATIVE_IMAGE_MODE_SMALL: '小图',
    CREATIVE_IMAGE_MODE_LARGE_VERTICAL: '大图竖图'
  },

  // 创意占位元素
  CONTENT_ELEMENTS: {
    CREATIVE_IMAGE_MODE_LARGE: {
      elements: [
        {
          field_name: 'image_ids',
          name: '创意内容',
          type: 'image',
          description: '建议最佳：宽高比16:9,1280*720≤尺寸≤2560*1440,支持JPG、PNG等图片格式',
          restriction: {
            min_width: 1280,
            min_height: 720,
            max_width: 2560,
            max_height: 1440,
            file_size: 1024,
            file_format: ['IMAGE_TYPE_JPG', 'IMAGE_TYPE_PNG']
          }
        },
        {
          field_name: 'title',
          name: '创意标题',
          type: 'text',
          description: '输入标题或采用创意搜索选择优质内容',
          restriction: {
            min_length: 5,
            max_length: 30
          }
        }
      ]
    },
    CREATIVE_IMAGE_MODE_VIDEO: {
      elements: [
        {
          name: '创意内容',
          type: 'group',
          elements: [
            {
              field_name: 'video_id',
              type: 'video',
              description: '宽高比16:9,视频码率≥516kbps,大小≤1000M,分辨率≥1280*720',
              restriction: {
                min_width: 1280,
                min_height: 720,
                max_width: 0,
                max_height: 0,
                file_size: 1024000,
                file_format: ['MEDIA_TYPE_MP4', 'MEDIA_TYPE_MOV', 'MEDIA_TYPE_AVI']
              }
            },
            {
              field_name: 'image_id',
              type: 'image',
              description: '建议最佳：宽高比16:9,1280*720≤尺寸≤2560*1440,支持JPG、PNG等图片格式',
              restriction: {
                min_width: 1280,
                min_height: 720,
                max_width: 2560,
                max_height: 1440,
                file_size: 1024,
                file_format: ['IMAGE_TYPE_JPG', 'IMAGE_TYPE_PNG']
              }
            }
          ],
          description: ''
        },
        {
          field_name: 'title',
          name: '创意标题',
          type: 'text',
          description: '输入标题或采用创意搜索选择优质内容',
          restriction: {
            min_length: 5,
            max_length: 30
          }
        }
      ]
    },
    CREATIVE_IMAGE_MODE_VIDEO_VERTICAL: {
      elements: [
        {
          name: '创意内容',
          type: 'group',
          elements: [
            {
              field_name: 'video_id',
              type: 'video',
              description: '宽高比9:16,视频码率≥516kbps,大小≤100M,分辨率≥720*1280',
              restriction: {
                min_width: 720,
                min_height: 1280,
                max_width: 0,
                max_height: 0,
                file_size: 102400,
                file_format: ['MEDIA_TYPE_MP4', 'MEDIA_TYPE_MOV', 'MEDIA_TYPE_AVI']
              }
            },
            {
              field_name: 'image_id',
              type: 'image',
              description: '建议最佳：宽高比9:16,720*1280≤尺寸≤1440*2560,支持JPG、PNG等图片格式',
              restriction: {
                min_width: 720,
                min_height: 1280,
                max_width: 1440,
                max_height: 2560,
                file_size: 1024,
                file_format: ['IMAGE_TYPE_JPG', 'IMAGE_TYPE_PNG']
              }
            }
          ],
          description: ''
        },
        {
          field_name: 'title',
          name: '创意标题',
          type: 'text',
          description: '输入标题或采用创意搜索选择优质内容',
          restriction: {
            min_length: 5,
            max_length: 30
          }
        }
      ]
    },
    CREATIVE_IMAGE_MODE_GROUP: {
      elements: [
        {
          name: '创意内容',
          type: 'group',
          elements: [
            {
              field_name: 'image_ids1',
              type: 'image',
              description: '建议最佳：宽高比1.52,456*300≤尺寸≤1368*900,支持JPG、PNG等图片格式',
              restriction: {
                min_width: 456,
                min_height: 300,
                max_width: 1368,
                max_height: 900,
                file_size: 1024,
                file_format: ['IMAGE_TYPE_JPG', 'IMAGE_TYPE_PNG']
              }
            },
            {
              field_name: 'image_ids2',
              type: 'image',
              description: '建议最佳：宽高比1.52,456*300≤尺寸≤1368*900,支持JPG、PNG等图片格式',
              restriction: {
                min_width: 456,
                min_height: 300,
                max_width: 1368,
                max_height: 900,
                file_size: 1024,
                file_format: ['IMAGE_TYPE_JPG', 'IMAGE_TYPE_PNG']
              }
            },
            {
              field_name: 'image_ids3',
              type: 'image',
              description: '建议最佳：宽高比1.52,456*300≤尺寸≤1368*900,支持JPG、PNG等图片格式',
              restriction: {
                min_width: 456,
                min_height: 300,
                max_width: 1368,
                max_height: 900,
                file_size: 1024,
                file_format: ['IMAGE_TYPE_JPG', 'IMAGE_TYPE_PNG']
              }
            }
          ]
        },
        {
          field_name: 'title',
          name: '创意标题',
          type: 'text',
          description: '',
          restriction: {
            min_length: 5,
            max_length: 30
          }
        }
      ]
    },
    CREATIVE_IMAGE_MODE_SMALL: {
      elements: [
        {
          field_name: 'image_ids',
          name: '创意内容',
          type: 'image',
          description: '建议最佳：宽高比1.52,456*300≤尺寸≤1368*900,支持JPG、PNG等图片格式',
          restriction: {
            min_width: 456,
            min_height: 300,
            max_width: 1368,
            max_height: 900,
            file_size: 1024,
            file_format: ['IMAGE_TYPE_JPG', 'IMAGE_TYPE_PNG']
          }
        },
        {
          field_name: 'title',
          name: '创意标题',
          type: 'text',
          description: '输入创意标题，创意标题5-30个字',
          restriction: {
            min_length: 5,
            max_length: 30
          }
        }
      ]
    },
    CREATIVE_IMAGE_MODE_LARGE_VERTICAL: {
      elements: [
        {
          field_name: 'image_ids',
          name: '创意内容',
          type: 'image',
          description: '建议最佳：宽高比9:16,720*1280≤尺寸≤1440*2560,支持JPG、PNG等图片格式',
          restriction: {
            min_width: 720,
            min_height: 1280,
            max_width: 1440,
            max_height: 2560,
            file_size: 500,
            file_format: ['IMAGE_TYPE_JPG', 'IMAGE_TYPE_PNG']
          }
        },
        {
          field_name: 'title',
          name: '创意标题',
          type: 'text',
          description: '输入创意标题，创意标题5-30个字',
          restriction: {
            min_length: 5,
            max_length: 30
          }
        }
      ]
    }
  },

  // 创意元素提交格式
  CONTENT_VALUE: {
    CREATIVE_IMAGE_MODE_LARGE: {
      title: '',
      source: [
        {
          type: 'image_id',
          path_url: '',
          view_url: ''
        }
      ]
    },
    CREATIVE_IMAGE_MODE_VIDEO: {
      title: '',
      source: [
        {
          type: 'video_id',
          path_url: '',
          view_url: ''
        },
        {
          type: 'image_id',
          path_url: '',
          view_url: ''
        }
      ]
    },
    CREATIVE_IMAGE_MODE_VIDEO_VERTICAL: {
      title: '',
      source: [
        {
          type: 'video_id',
          path_url: '',
          view_url: ''
        },
        {
          type: 'image_id',
          path_url: '',
          view_url: ''
        }
      ]
    },
    CREATIVE_IMAGE_MODE_GROUP: {
      title: '',
      source: [
        {
          type: 'image_id',
          path_url: '',
          view_url: ''
        },
        {
          type: 'image_id',
          path_url: '',
          view_url: ''
        },
        {
          type: 'image_id',
          path_url: '',
          view_url: ''
        }
      ]
    },
    CREATIVE_IMAGE_MODE_SMALL: {
      title: '',
      source: [
        {
          type: 'image_id',
          path_url: '',
          view_url: ''
        }
      ]
    },
    CREATIVE_IMAGE_MODE_LARGE_VERTICAL: {
      title: '',
      source: [
        {
          type: 'image_id',
          path_url: '',
          view_url: ''
        }
      ]
    }
  }
}
