using OnlineExam.Models.Dto;
using OnlineExam.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;
using AutoMapper;

namespace OnlineExam.Extensions
{
    public static class ConfigureMappingExtension
    {
        public static IServiceCollection ConfigureMapping(this IServiceCollection service)
        {
            var mappingConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingProfile()); });

            IMapper mapper = mappingConfig.CreateMapper();

            service.AddSingleton(mapper);

            return service;
        }
    }

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            AllowNullDestinationValues = true;
            AllowNullCollections = true;
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>()
                .ForMember(x => x.Password, y => y.MapFrom(z => PasswordEncrypter.Encrypt(z.Password)))
                ;

            CreateMap<QuestionDto, Question>();
            //CreateMap<List<Question>, List<QuestionDto>>().ReverseMap();

            CreateMap<Question, QuestionDto>()
                    .ForMember(dto => dto.User, map => map.MapFrom(q => q.User));


            CreateMap<AnswerDto, Answer>();
            CreateMap<Answer, AnswerDto>()
                    .ForMember(dto => dto.Question, map => map.MapFrom(q => q.Question));


            
            CreateMap<UserAnswerDto, UserAnswer>();
            CreateMap<UserAnswer, UserAnswerDto>()
                    .ForMember(dto => dto.Question, map => map.MapFrom(q => q.Question))
                    .ForMember(dto => dto.User, map => map.MapFrom(q => q.User))
                    .ForMember(dto => dto.Answer, map => map.MapFrom(q => q.Answer));


            CreateMap<UserPointDto, UserPoint>();
            CreateMap<UserPoint, UserPointDto>()
                    .ForMember(dto => dto.User, map => map.MapFrom(q => q.User));

        }
    }
}
